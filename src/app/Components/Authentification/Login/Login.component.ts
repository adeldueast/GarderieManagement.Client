import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Auth2Service } from 'src/app/shared/services/Auth2.service';
import { AuthService } from '../../../shared/services/Auth.service';

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
    public authService2: Auth2Service,

    private route: ActivatedRoute,
    private router: Router
  ) {
    // redirect to home if already logged in
    if (this.authService2.isUserAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {}

  Login() {
    this.authService.login(this.login_request).subscribe({
      next: (res) => {
      
        // get return url from route parameters or default to '/'
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      error: (err) => alert(err.error.errors),
      complete: () => console.log('login completed'),
    });
  }

  Login2() {
    this.authService2.loginUser("Account/Login",this.login_request).subscribe({
      next: (res) => {
        
        localStorage.setItem("token", res.data.accessToken);
        // get return url from route parameters or default to '/'
        this.authService2.isUserInRole("caca");
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      error: (err) => [console.log(err),alert(err)],
      complete: () => console.log('login completed'),
    });
  }
}
