import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/http/users.service';

@Component({
  selector: 'app-modal-staff-create',
  templateUrl: './modal-staff-create.component.html',
  styleUrls: ['./modal-staff-create.component.css'],
})
export class ModalStaffCreateComponent implements OnInit {
  rolesEnum = ['admin', 'employee'];
  form = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    isAdmin: new FormControl(false),
  });

  constructor(private userService: UsersService) {}

  ngOnInit() { console.clear()}

  onSubmit() {
    //console.log(this.form.value);
    this.userService
      .inviteStaff('Account/InviteStaff', this.form.value)
      .subscribe((res) => {
       // console.log(res)
      },err=>console.log(err)
      );
  }
}
