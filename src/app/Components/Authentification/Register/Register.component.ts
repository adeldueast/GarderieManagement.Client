import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { Auth2Service } from 'src/app/shared/services/Auth2.service';

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
    private authService: AuthService,
    private authService2: Auth2Service,
    private router: Router
  ) {
    // redirect to home if already logged in
    if (this.authService2.isUserAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {}

  Register() {
    this.authService.registerOwner(this.register_request).subscribe({
      next: (res) => [console.log('res', res), console.log('res', res)],
      error: (err) => alert(err.error.errors),
      complete: () => console.log('registeration completed'),
    });
  }
}
