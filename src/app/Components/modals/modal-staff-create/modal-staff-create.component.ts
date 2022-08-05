import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/shared/services/http/users.service';

@Component({
  selector: 'app-modal-staff-create',
  templateUrl: './modal-staff-create.component.html',
  styleUrls: ['./modal-staff-create.component.css'],
})
export class ModalStaffCreateComponent implements OnInit {
  success = false;
  rolesEnum = ['admin', 'employee'];
  ngForm = new FormGroup({
    firstname: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    isAdmin: new FormControl(false),
  });

  constructor(private userService: UsersService,    public dialogRef: MatDialogRef<ModalStaffCreateComponent>,) {}

  ngOnInit() {}

  onSubmit() {
    //console.log(this.form.value);
    if (this.ngForm.valid) {
      this.userService
        .inviteStaff('Account/InviteStaff', this.ngForm.value)
        .subscribe(
          (res) => {
           // console.log(res), 
            this.dialogRef.close(true);
          },
          (err) => console.log(err),
          () => console.log('create staff completed')
        );
    }
  }
}
