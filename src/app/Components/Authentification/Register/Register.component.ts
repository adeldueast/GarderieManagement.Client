import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/http/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // register_request = {
  //   firstname: undefined,
  //   lastname: undefined,
  //   email: undefined,
  //   password: undefined,
  // };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // redirect to home if already logged in
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {}

  Register() {
    this.authService
      .registerUser('Account/Register', this.registerForm.value)
      .subscribe({
        next: (res: any) => {
          //console.log('res', res), console.log('res', res);
          console.log(res);
          this.onSuccessRegister(res);
        },
        error: (err: any) => [
          console.error(err.error.errors),
          alert(err.error.errors),
        ],
        complete: () => {
          console.log('registeration completed');
          //this.router.navigate(['/login']);
          //alert('registeration completed, go back and signin')
        },
      });
  }

  onSuccessRegister(res: any) {
    const token = res.data.accessToken;
    localStorage.setItem('token', token);

    this.authService.sendAuthStateChangeNotification(true);
    // this.authService.UpdateCurrentUserInfo(token);
    //Check if user (owner) created a garderie

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigate([returnUrl]);
  }
}
