import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnvironmentUrlService } from 'src/app/shared/services/EnvironmentUrl.service';
import { AttendanceService } from 'src/app/shared/services/http/attendance.service';
import { AuthService } from 'src/app/shared/services/http/auth.service';
import { ModalJournalComponent } from '../modal-journal/modal-journal.component';

@Component({
  selector: 'app-modal-action',
  templateUrl: './modal-action.component.html',
  styleUrls: ['./modal-action.component.css'],
})
export class ModalActionComponent implements OnInit {
  isTutor!:boolean;
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private attendanceService: AttendanceService,
    public authService:AuthService, public envUrls: EnvironmentUrlService
  ) {}

  ngOnInit() {  
    // console.log(this.data);
    this.isTutor = this.authService.isUserInRole('tutor');
  }
  arrivedAt() {
    this.attendanceService
      .arrivedAt(`Attendancies/Arrived/${this.data.id}`)
      .subscribe({
        next: (res) => {
          //  ,
          this.data.hasArrived = true;
        },
        error: (err) => console.log(err),
        complete: () => console.log('arrivedAt completed'),
      });
  }

  leftAt() {
    // https://localhost:44356/api/Attendancies/Arrived/3
    this.attendanceService
      .leftAt(`Attendancies/Left/${this.data.id}`)
      .subscribe({
        next: (res) => {
          //    ,
          this.data.hasArrived = false;
        },
        error: (err) => console.log(err),
        complete: () => console.log('leftAt completed'),
      });
  }

  createAbsence() {
    let createAbsenceRequest = {
      enfantId: this.data.id,
      absenceDate: new Date(),
      AbsenceDescription: `${this.data.nom} is sick today`,
    };

    this.attendanceService
      .createAbsence(
        `Attendancies/Absent/${this.data.id}`,
        createAbsenceRequest
      )
      .subscribe({
        next: (res) => {
          //  ,
          this.data.hasArrived = false;
        },
        error: (err) => console.log(err),
        complete: () => console.log('leftAt completed'),
      });
  }

  openJournalDialog() {
   
    
    const dialogRef = this.dialog.open(ModalJournalComponent, {
      data: this.data,
    });

  
  }
}
