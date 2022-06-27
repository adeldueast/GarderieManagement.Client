import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/http/Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthenticated?: boolean;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.authChanged.subscribe((res) => {
      this.isAuthenticated = res;
    });
  }
  ngOnInit(): void {
    if (this.authService.isUserAuthenticated())
      this.authService.sendAuthStateChangeNotification(true);
  }


}
