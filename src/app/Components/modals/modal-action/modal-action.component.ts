import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceService } from 'src/app/shared/services/http/attendance.service';

@Component({
  selector: 'app-modal-action',
  templateUrl: './modal-action.component.html',
  styleUrls: ['./modal-action.component.css'],
})
export class ModalActionComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit() {
   // console.log(this.data);
  }
  arrivedAt() {
    this.attendanceService
      .arrivedAt(`Attendancies/Arrived/${this.data.id}`)
      .subscribe({
        next: (res) => [console.log(res), (this.data.hasArrived = true)],
        error: (err) => console.log(err),
        complete: () => console.log('arrivedAt completed'),
      });
  }

  leftAt() {
    // https://localhost:44356/api/Attendancies/Arrived/3
    this.attendanceService
      .leftAt(`Attendancies/Left/${this.data.id}`)
      .subscribe({
        next: (res) => [console.log(res), (this.data.hasArrived = false)],
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
          next: (res) => [console.log(res), (this.data.hasArrived = false)],
        error: (err) => console.log(err),
        complete: () => console.log('leftAt completed'),
      });
  }
}
