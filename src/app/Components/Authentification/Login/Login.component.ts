import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/http/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
      next: (res: any) => {
        this.onSuccessLogin(res);
      },
      error: (err: any) => [
        console.error(err.error.errors),
        alert(err.error.errors),
      ],
      complete: () => console.log('login completed'),
    });
  }

  onSuccessLogin(res: any) {
    const token = res.data.accessToken;
    localStorage.setItem('token', token);

    this.authService.sendAuthStateChangeNotification(true);
    // this.authService.UpdateCurrentUserInfo(token);
    //Check if user (owner) created a garderie

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }
}
