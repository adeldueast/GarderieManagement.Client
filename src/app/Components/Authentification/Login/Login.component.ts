import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/http/auth.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css'],
})
export class LoginComponent implements OnInit {
  login_request = {
    email: undefined,
    password: undefined,
  };

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // redirect to home if already logged in
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {}


  Login() {
    this.authService.loginUser('Account/Login', this.login_request).subscribe({
      next: (res) => {
        this.onSuccessLogin(res);
      },
      error: (err) => [console.log(err.error.errors), alert(err.error.errors)],
      complete: () => console.log('login completed'),
    });
  }

  onSuccessLogin(res: any) {
    const token = res.data.accessToken;
    localStorage.setItem('token', token);
    this.authService.UpdateCurrentUserInfo(token);
    this.authService.sendAuthStateChangeNotification(true);
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }
}
