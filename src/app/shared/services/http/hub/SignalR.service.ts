import { fn } from '@angular/compiler/src/output/output_ast';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private subscribtion?: Subscription;
  private loginToken = '';

  constructor(private authService: AuthService) {
    console.log('🤣🤣🤣 SIGNAL R.service constructor 🤣🤣🤣');
  
  }

  onInit(){
    this.subcribeToAuthChanges();
    if(this.authService.isUserAuthenticated()){
      this.authService.sendAuthStateChangeNotification(true);
    }
  }

  onDestroy() {
    console.log('ngOnDestroy: cleaning up...');
    if (this.hubConnection) {
      this.endConnection();
    }
    this.unsubcribeToAuthChanges();
  }

  subcribeToAuthChanges() {
    this.subscribtion = this.authService.authChanged.subscribe((result) => {
      console.log('auth state changed =>', result);
      if (result) {
        this.loginToken = localStorage.getItem('token')!;
        this.startConnection();
        return;
      }
      
      if (this.hubConnection) {
        this.endConnection();
        return;
      }
    });
  }

  unsubcribeToAuthChanges() {
    this.subscribtion!.unsubscribe();
  }

  startConnection = async () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:44356/Children`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => this.loginToken,
      })
      .build();
    // console.log(this.hubConnection, 'XOXOXO');

    await this.hubConnection
      .start()
      .then(() => console.log('Connection to Hub started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  endConnection = () => {
    this.hubConnection
      .stop()
      .then(() => console.log('Connection to Hub ended'))
      .catch((err) =>
        console.log('Error while ending the  connection: ' + err)
      );
  };

  addChildChangesListener = (fn: () => void) => {
    this.hubConnection.on('childUpdate', (data) => {
      // console.log(data);
      console.warn('notifying other users of childInfoChanges');

      fn();
    });
  };

  removeChildChangesListener() {
    this.hubConnection.off('childUpdate');
  }

  addNotifyUserStatusChangesListener = (fn: () => void) => {
    this.hubConnection.on('notifyUserStatusChanges', (data) => {
      //console.log(data);
      console.warn('notifying other users of userStatusChanges');

      fn();
    });
  };

  removeNotifyUserStatusChangesListener() {
    this.hubConnection.off('notifyUserStatusChanges');
  }

  addChildAttendanceChangesListener = (fn: () => void) => {
    this.hubConnection.on('childAttendanceUpdate', (data) => {
      //console.log(data);
      console.warn('notifying other users of childAttendanceChanges');

      fn();
    });
  };

  removeChildAttendanceChangesListener = () => {
    this.hubConnection.off('childAttendanceUpdate');
  };
  // ChildAttendanceUpdate
}
