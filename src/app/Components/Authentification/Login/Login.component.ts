import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/Auth.service';


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

  // Login() {
  //   this.authService.login(this.login_request).subscribe({
  //     next: (res) => {
      
  //       // get return url from route parameters or default to '/'
  //       const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  //       this.router.navigate([returnUrl]);
  //     },
  //     error: (err) => alert(err.error.errors),
  //     complete: () => console.log('login completed'),
  //   });
  // }

  Login() {
    this.authService.loginUser("Account/Login",this.login_request).subscribe({
      next: (res) => {
        
        localStorage.setItem("token", res.data.accessToken);
        this.authService.sendAuthStateChangeNotification(true);
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigate([returnUrl]);
      },
      error: (err) => [console.log(err),alert(err)],
      complete: () => console.log('login completed'),
    });
  }
}
