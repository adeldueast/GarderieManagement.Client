import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/http/auth.service';
import { SignalRService } from './shared/services/http/hub/SignalR.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated?: boolean;
  constructor(
    private authService: AuthService,
    private signalRService: SignalRService
  ) {
    // console.log('AppComponent constructor');
  }

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
   
  }
}
