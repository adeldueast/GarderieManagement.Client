import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/Auth.service';

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

  Logout() {
    //Gets rid of the token in the local storage
    this.authService.logout();

    console.log('Navigating to /home after logging out');
    //TODO : I should technically just navigate back to /login ..
    //       But I want to test the guard as it should redirect to /login if token doesnt exist
    //       but it doesnt work.
    this.router.navigate(['/sidebar']);
  }
}
