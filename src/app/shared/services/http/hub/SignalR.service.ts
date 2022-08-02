
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subscription } from 'rxjs';
import { EnvironmentUrlService } from '../../EnvironmentUrl.service';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public connectionId?: any;
  public hubConnection!: signalR.HubConnection;
  private subscribtion?: Subscription;
  private loginToken = '';

  constructor(
    private authService: AuthService,
    private envUrl: EnvironmentUrlService
  ) {
    //console.log('🤣🤣🤣 SIGNAL R.service constructor 🤣🤣🤣');
  }

  onInit() {
    //simply subscribe to obersvable
    this.subcribeToAuthChanges();

    //will check if user is Authenticated and trigger a true response in the subscription above
    if (this.authService.isUserAuthenticated()) {
      this.authService.sendAuthStateChangeNotification(true);
    }
  }

  onDestroy() {
    // console.log('ngOnDestroy: cleaning up...');
    if (this.hubConnection) {
      this.endConnection();
    }
    this.unsubcribeToAuthChanges();
  }

  subcribeToAuthChanges() {
    this.subscribtion = this.authService.authChanged.subscribe(
      async (result) => {
        console.log('auth state changed =>', result);

        // this will be triggered...
        if (result) {
          this.loginToken = localStorage.getItem('token')!;
          await this.startConnection();
          return;
        }

        if (this.hubConnection) {
         await this.endConnection();
          return;
        }
      }
    );
  }

  unsubcribeToAuthChanges() {
    this.subscribtion!.unsubscribe();
  }

  startConnection = async () => {
    const url = `${this.envUrl.urlAddress}/Children`;
    
  console.warn('start connection hub',url);
  
    this.hubConnection = new signalR.HubConnectionBuilder()

      .withUrl(`${url}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => this.loginToken,
      })
      .build();

    await this.hubConnection
      .start()
      .then(() => console.log('Connection to Hub started'))
      .catch((err) => console.log('Error while starting connection: ' + err));

    // await this.getConnectionId();
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

  addChildAttendanceChangesListener = (fn: (data?: any) => any) => {
    this.hubConnection.on('childAttendanceUpdate', (data) => {
      console.log(data);
      console.warn('notifying other users of childAttendanceChanges');
      fn(data);
    });
  };

  removeChildAttendanceChangesListener = () => {
    this.hubConnection.off('childAttendanceUpdate');
  };

  addNewNotificationListener = (fn: (data?: any) => any) => {
    this.hubConnection.on('newNotification', (data) => {
      // console.log(data);
      console.warn('notifying other users of newNotification avaible');
      fn(data);
    });
  };
  removeNewNotificationListener = () => {
    this.hubConnection.off('newNotification');
  };

  addGroupsChangesListener = (fn: (data?: any) => any) => {
    this.hubConnection.on('groupsChanges', (data) => {
      console.log(data);
      console.warn('notifying other users of groupsChanges');
      fn(data);
    });
  };

  removeGroupsChangesListener = () => {
    this.hubConnection.off('groupsChanges');
  };

  // ChildAttendanceUpdate
}
