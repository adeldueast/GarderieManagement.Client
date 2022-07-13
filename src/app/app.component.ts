import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRService } from './shared/services/http/hub/SignalR.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated?: boolean;
  constructor(
  
    private signalRService: SignalRService
  ) {
     //console.log('AppComponent constructor');
  }

    ngOnInit(): void {
    //console.log('ng INIT APP.COMPONENT.TS');
    this.signalRService.onInit();
  }
  ngOnDestroy(): void {
    console.log('ng DESOYTR APP.COMPONENT.TS');
    this.signalRService.onDestroy();
  }
}
