import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/http/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthenticated?: boolean;
  constructor(private authService: AuthService, private router: Router) {
   
    console.log('AppComponent constructor');
    
  }
  ngOnInit(): void {
  
  }


}
