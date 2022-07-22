import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-notifications',
  templateUrl: './modal-notifications.component.html',
  styleUrls: ['./modal-notifications.component.css'],
})
export class ModalNotificationsComponent implements OnInit {
  notifications?: any;
  public NotifEnum = NotificationType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  //  console.log(this.data);
  }

  getIcon(notificationType: any) {
    switch (notificationType) {
      case NotificationType.Photo:
        return 'add_a_photo';
      case NotificationType.Journal:
        return 'edit_document';
      case NotificationType.Event:
        return 'calendar_month';
      default:
        return 'info';
    }
  }
}

export enum NotificationType {
  Photo,
  Journal,
  Event,
}
