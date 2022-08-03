import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/http/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register_request = {
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    password: undefined,
  };

  constructor(private authService: AuthService, private router: Router) {
    // redirect to home if already logged in
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() { console.clear()}

  Register() {
    this.authService.registerUser(
      'Account/Register',
      this.register_request
    ).subscribe({
      next: (res:any) => {
        //console.log('res', res), console.log('res', res);
      },
      error: (err:any) => [
        console.error(err.error.errors),
        alert(err.error.errors),
      ],
      complete: () =>{
        console.log('registeration completed'),
        this.router.navigate(['/login']);
        alert('registeration completed, go back and signin')
      },
    });
  }
}
