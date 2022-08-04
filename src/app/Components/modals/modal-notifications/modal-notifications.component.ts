import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/http/notification.service';
import { Router } from '@angular/router';
import { ModalJournalComponent } from '../modal-journal/modal-journal.component';
import { ModalPreviewPictureComponent } from '../modal-preview-picture/modal-preview-picture.component';

@Component({
  selector: 'app-modal-notifications',
  templateUrl: './modal-notifications.component.html',
  styleUrls: ['./modal-notifications.component.css'],
})
export class ModalNotificationsComponent implements OnInit {
  notifications?: any;
  public NotifEnum = NotificationType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalNotificationsComponent>
  ) {}

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

  onNotifClick(notification: any, index: number) {
   console.log('notif click', index,notification);

    //1) mark the notif as seen
    if (!notification.seen) {
      this.markNotificationSeen(notification.id, index);
    }

    //2) depending on the type of notification, redirect user to right
    switch (notification.notificationType) {
      case NotificationType.Journal:
        this.openJournalDialog(notification.dataId);
        break;
      case NotificationType.Photo:
        this.router.navigate(['photos'])
        this.openImagePreview(notification.dataId);
        break;
      case NotificationType.Event:
        break;
      default:
        break;
    }
  }

  openJournalDialog(notificationDataId: number) {
    const dialogRef = this.dialog.open(ModalJournalComponent, {
      data: {
        dataId: notificationDataId,
      },
    });
  }

  openImagePreview(notificationDataId: number){
    const dialogRef = this.dialog.open(ModalPreviewPictureComponent, {
      data: {
        images: [{id:notificationDataId}],
        index:0,
        fromNotif:true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
      }
    });
  }

  markNotificationSeen(notificationId: number, index: number) {
    this.notificationService
      .markNotificationSeen(`Notification/MarkSeen/${notificationId}`)
      .subscribe(
        (res) => {
         //  ;

          this.dialogRef.close(`${index}`);
        },
        (err) => console.log(err)
      );
  }

  markAllNotificationSeen() {
    this.notificationService
      .markAllNotificationSeen(`Notification/MarkSeen`)
      .subscribe(
        (res) => {
          // 
        },
        (err) => console.log(err)
      );
  }
}

export enum NotificationType {
  Photo,
  Journal,
  Event,
}
