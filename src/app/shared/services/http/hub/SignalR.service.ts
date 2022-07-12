import { fn } from '@angular/compiler/src/output/output_ast';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root',
})
export class SignalRService implements OnDestroy {
  private hubConnection!: signalR.HubConnection;
  private subscribtion?: Subscription;
  private loginToken = '';

  constructor(private authService: AuthService) {
    this.subcribeToAuthChanges();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy: cleaning up...');
    this.unsubcribeToAuthChanges();
  }

  subcribeToAuthChanges() {
    this.subscribtion = this.authService.authChanged.subscribe((result) => {
      console.log('auth state changed =>', result);
      if (result) {
        this.loginToken = localStorage.getItem('token')!;
        // console.log(this.loginToken);

        this.startConnection();
        return;
      }
      this.endConnection();
    });
  }

  unsubcribeToAuthChanges() {
    this.subscribtion!.unsubscribe();
  }

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:44356/Children`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => this.loginToken,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection to Hub started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  endConnection = () => {
    this.hubConnection
      .stop()
      //.then(() => console.log('Connection to Hub ended'))
      .catch((err) =>
        console.log('Error while ending the  connection: ' + err)
      );
  };

  addChildChangesListener = (fn: () => void) => {
    this.hubConnection.on('childUpdate', (data) => {
      console.log(data);
      fn();
    });
  };

  removeChildChangesListener() {
    this.hubConnection.off('childUpdate');
  }

  addNotifyUserStatusChangesListener = (fn: () => void) => {
    this.hubConnection.on('notifyUserStatusChanges', (data) => {
      console.log(data);
      fn();
    });
  };

  removeNotifyUserStatusChangesListener() {
    this.hubConnection.off('notifyUserStatusChanges');
  }

  addChildAttendanceChangesListener = (fn: () => void) => {
    this.hubConnection.on('childAttendanceUpdate', (data) => {
      console.log(data);
      fn();
    });
  };

  removeChildAttendanceChangesListener = () => {
    this.hubConnection.off('childAttendanceUpdate');
  };
  // ChildAttendanceUpdate
}
