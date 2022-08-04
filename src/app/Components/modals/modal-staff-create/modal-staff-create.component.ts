import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/http/users.service';

@Component({
  selector: 'app-modal-staff-create',
  templateUrl: './modal-staff-create.component.html',
  styleUrls: ['./modal-staff-create.component.css'],
})
export class ModalStaffCreateComponent implements OnInit {
  success =false;
  rolesEnum = ['admin', 'employee'];
  ngForm = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    isAdmin: new FormControl(false),
  });

  constructor(private userService: UsersService) {}

  ngOnInit() {}

  onSubmit() {
    //console.log(this.form.value);
    this.userService
      .inviteStaff('Account/InviteStaff', this.ngForm.value)
      .subscribe(
        (res) => {console.log(res),this.success=true},
        (err) => console.log(err),
        ()=>console.log('create staff completed')
      );
  }
}
