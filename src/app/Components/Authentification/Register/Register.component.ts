import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/http/auth.service';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css'],
})
export class RegisterComponent implements OnInit {
  register_request = {
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    password: undefined,
  };

  constructor(
    private AuthService: AuthService,
    private router: Router
  ) {
    // redirect to home if already logged in
    if (this.AuthService.isUserAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {}

  Register() {
    this.AuthService.registerUser('Account/Register',this.register_request).subscribe({
      next: (res) => [console.log('res', res), console.log('res', res)],
      error: (err) =>[ console.error(err.error.errors),alert(err.error.errors)],
      complete: () => console.log('registeration completed'),
    });
  }
}
