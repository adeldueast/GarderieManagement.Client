import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  CalendarOptions,
  EventInput,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import { lastValueFrom } from 'rxjs';
import { AttendanceService } from 'src/app/shared/services/http/attendance.service';
import { ChildrenService } from 'src/app/shared/services/http/children.service';
import { SignalRService } from 'src/app/shared/services/http/hub/signal-r.service';

@Component({
  selector: 'app-child-calendar-tab',
  templateUrl: './child-calendar-tab.component.html',
  styleUrls: ['./child-calendar-tab.component.css'],
})
export class ChildCalendarTabComponent implements OnInit, OnDestroy {
//   references the #calendar in the template
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @Input() child_info: any;
  calendarOptions!: CalendarOptions;
  events: EventInput[] = [];
  constructor(
    private childrenService: ChildrenService,
    private attendanceService: AttendanceService,
    private signalRService: SignalRService
  ) {}

  public ngOnDestroy(): void {
    this.signalRService.removeChildAttendanceChangesListener();
  }

  public async ngOnInit(): Promise<void> {
    await this.getChildAttendances();
    this.initCalendarOptions();
    this.signalRService.addChildAttendanceChangesListener(
      this.onChildAttendancesChanges.bind(this)
    );
  }

  onChildAttendancesChanges(attendance?: any): any {
   // console.log('MONEY TEAM', attendance);
   
    const event:EventInput = {
      
      id: attendance.id,
      title: attendance.present ? 'Present' : `Absent: ${attendance.absenceDescription}`,
    
      allDay: true,
      date: attendance.date,
      color: attendance.present ? '#00ff1a' : '#ff0011',
      display: 'auto',
      
      
      
    }

    const existingEvent =this.calendarComponent.getApi().getEventById(attendance!.id);
  
    if(existingEvent){
      existingEvent?.remove();
      this.calendarComponent.getApi().addEvent(event);
    }
    this.calendarComponent.getApi().addEvent(event);
  }

  private initCalendarOptions = () => {
   
   const  child_birthdayEvent:EventInput  = {

      title: '🎂 BIRTHDAY 🎂',
      allDay: true,
    icon:'asterisk',
      rrule: {
        freq: 'yearly',
        dtstart: this.child_info.birthdate,
      },
    }
    this.events = [...this.events,child_birthdayEvent]

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this), // bind is important!
      events: this.events,
      eventTextColor: '#000000',
      eventDisplay: 'list-item',
    };
  };

  private async getChildAttendances() {
    

    await lastValueFrom(
      this.childrenService.getChildAttendances(
        `Attendancies/${this.child_info.id}`
      )
    )
      .then((res) => {
       // console.log(res);
        
        res.forEach((e: any) => {
          const event = {
            id: e.id,
            title: e.present ? 'Present' : `Absent: ${e.absenceDescription}`,
            allDay: true,
            date: e.date,
            color: e.present ? '#00ff1a' : '#ff0011',
            display: 'auto',
          };
          this.events.push(event);
        });
      })
      .catch((err) => console.log(err))
      .finally(() =>
        console.log('fetching all attendances of child completed')
      );
  }

  private handleDateClick(arg: any) {
    let clickedDate = new Date(`${arg.dateStr} `);

    //allow user to create absence for child
    if (clickedDate >= new Date()) {
      const absenceMessage = prompt(
        `Please provide an absence justification for ${this.child_info.nom}`,
        'No Absence Reason'
      );
      if (absenceMessage != null) {
        //alert(clickedDate)
        this.createAbsence(clickedDate, absenceMessage);
        return;
      }
      //console.log('absence canceled');
    }
  }

  private createAbsence(absenceDate: any, absenceMessage: string) {
    let createAbsenceRequest = {
      enfantId: this.child_info.id,
      absenceDate: absenceDate,
      AbsenceDescription: absenceMessage,
    };
  

    this.attendanceService
      .createAbsence(
        `Attendancies/Absent/${this.child_info.id}`,
        createAbsenceRequest
      )
      .subscribe({
        next: (res) => {
         
          const event = {
            id: res.id,
            title: res.present ? 'Present' : 'Absent',
            allDay: true,
            date: res.date,
            color: res.present ? '#00ff1a' : '#ff0011',
            display: 'auto',
          };
          
          // this.calendarComponent.getApi().addEvent(event);
        },
        error: (err) => console.log(err),
        complete: async () => {
          console.log('create absence completed');
        },
      });
  }
}
