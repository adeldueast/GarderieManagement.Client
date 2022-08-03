import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/http/users.service';

@Component({
  selector: 'app-modal-staff-create',
  templateUrl: './modal-staff-create.component.html',
  styleUrls: ['./modal-staff-create.component.css'],
})
export class ModalStaffCreateComponent implements OnInit {
  rolesEnum = ['admin', 'employee'];
  form = new UntypedFormGroup({
    firstname: new UntypedFormControl(),
    lastname: new UntypedFormControl(),
    email: new UntypedFormControl(),
    phone: new UntypedFormControl(),
    isAdmin: new UntypedFormControl(false),
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
