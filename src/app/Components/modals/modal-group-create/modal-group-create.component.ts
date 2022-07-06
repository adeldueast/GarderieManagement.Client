import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { UsersService } from 'src/app/shared/services/http/users.service';
import { GroupService } from 'src/app/shared/services/http/group.service';

interface Staff {
  id: string;
  name: string;
}

@Component({
  selector: 'app-modal-group-create',
  templateUrl: './modal-group-create.component.html',
  styleUrls: ['./modal-group-create.component.css'],
})

export class ModalGroupCreateComponent implements OnInit {
  
  staff: Staff[] = [];

  public color: ThemePalette = 'primary';
  
  form: FormGroup = new FormGroup({
    name: new FormControl(),
    educatriceId: new FormControl(),
    colorCtr: new FormControl(),
  });

  constructor(
    private userService: UsersService,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.getAllStaffNoGroup();
  }

  getAllStaffNoGroup = () => {
    this.userService.getAllStaffNoGroup('User/employeesNoGroup').subscribe({
      next: (res) => {
        console.log(res),
          res.data.forEach((e: any) => {
            let staff = {
              id: e.id,
              name: `${e.firstName} ${e.lastName}`,
            };
            this.staff.push(staff);
          });
        console.log(this.staff);
      },
      error: (err) => console.log(err),
      complete: () => {
        'fetching all employees completed';
      },
    });
  };

  // onSelectChange(value: any) {
  //   console.log(value);
  //   this.form.patchValue({
  //     educatriceId: value,
  //   });
  // }

  onSubmit() {
    console.log(this.form.value);
    let createGroup_request = {
      name: this.form.get('name')?.value,
      educatriceId: this.form.get('educatriceId')?.value,
      hexColor: `#${this.form.get('colorCtr')?.value.hex}`,
    };
    console.log(createGroup_request);
    this.createGroup(createGroup_request);
  }

  createGroup = (createGroup_request: any) => {
    this.groupService
      .createGroup('Group/Create', createGroup_request)
      .subscribe((res) => console.log(res));
  };
}
