import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/http/auth.service';
import { SignalRService } from 'src/app/shared/services/http/hub/SignalR.service';
import { NotificationService } from 'src/app/shared/services/http/notification.service';
import { ModalNotificationsComponent } from '../modals/modal-notifications/modal-notifications.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  constructor(
    public authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private signalRService: SignalRService
  ) {}
  ngOnDestroy(): void {
    this.signalRService.removeNewNotificationListener();
  }

  notifications?: any;
  newNotifications: number = 0;
  ngOnInit() { 
    console.log(this.authService.user_info);

    // console.clear()
    this.getNotifications();
    this.signalRService.addNewNotificationListener(
      this.getNotifications.bind(this)
    );
  }

  getNotifications() {
  //  console.log('getting all notifications');
    
    this.notificationService.getAllNotification('Notification/Get').subscribe(
      (res) => {
        //console.log(res);
        this.newNotifications = 0;
        this.notifications = res;
        this.notifications.forEach((n: any) => {
          if (!n.seen) {
            this.newNotifications++;
          } else {
            return;
          }
        });
      },
      (err) => console.log(err)
    );
  }

  openNotificationDialog() {
    const dialogRef = this.dialog.open(ModalNotificationsComponent, {
      data: {
        notifications: this.notifications,
      },
    });
    dialogRef.afterClosed().subscribe((index) => {
      if (index) {
        this.notifications[index].seen = true;
        this.newNotifications--;
      }
    });
  }

  logout() {
    //Gets rid of the token in the local storage
    //this.authService.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
