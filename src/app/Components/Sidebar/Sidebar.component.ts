import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/http/auth.service';
import { NotificationService } from 'src/app/shared/services/http/notification.service';
import { ModalNotificationsComponent } from '../modals/modal-notifications/modal-notifications.component';

@Component({
  selector: 'app-Sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrls: ['./Sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}

  notifications?:number;
  
  ngOnInit() {
     this.getNotification();
  
  }

  getNotification() {
    this.notificationService.getAllNotification('Notification/Get').subscribe(
      (res) => {
        console.log(res);
        this.notifications = res.length;
      },
      (err) => console.log(err)
    );
  }
  openNotificationDialog(){
    const dialogRef = this.dialog.open(ModalNotificationsComponent);

  }
  logout() {
    //Gets rid of the token in the local storage
    //this.authService.logout();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
