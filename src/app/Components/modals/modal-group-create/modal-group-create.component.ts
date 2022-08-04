import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { UsersService } from 'src/app/shared/services/http/users.service';
import { GroupService } from 'src/app/shared/services/http/group.service';
import { ModalStaffCreateComponent } from '../modal-staff-create/modal-staff-create.component';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';

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
    name: new FormControl('', Validators.required),
    educatriceId: new FormControl('', Validators.required),
    colorCtr: new FormControl('', Validators.required),
  });

  constructor(
    private dialog: MatDialog,

    private userService: UsersService,
    private groupService: GroupService
  ) {}

  async ngOnInit() {
    await this.getAllStaffNoGroup();
    console.log(2);

    this.staff.length > 0 ? this.form.enable() : this.form.disable();
  }

  getAllStaffNoGroup = async () => {
    const promise = lastValueFrom(
      this.userService.getAllStaffNoGroup('User/employeesNoGroup')
    );

    await promise
      .then((res) => {
        res.data.forEach((e: any) => {
          let staff = {
            id: e.id,
            name: `${e.firstName} ${e.lastName}`,
          };
          this.staff.push(staff);
        });
        //console.log(this.staff);
        console.log(1);
      })
      .catch((err) => console.log(err));

    // next: (res) => {
    //   // ,
    //   res.data.forEach((e: any) => {
    //     let staff = {
    //       id: e.id,
    //       name: `${e.firstName} ${e.lastName}`,
    //     };
    //     this.staff.push(staff);
    //   });
    //   //console.log(this.staff);
    // },
    // error: (err) => console.log(err),
    // complete: () => {
    //   'fetching all employees completed';
    // },
  };

  onSubmit() {
    //(this.form.value);
    let createGroup_request = {
      name: this.form.get('name')?.value,
      educatriceId: this.form.get('educatriceId')?.value,
      hexColor: `#${this.form.get('colorCtr')?.value.hex}`,
    };
    //console.log(createGroup_request);
    this.createGroup(createGroup_request);
  }

  createGroup = (createGroup_request: any) => {
    this.groupService
      .createGroup('Group/Create', createGroup_request)
      .subscribe(
        (res) => {},
        (err) => console.log(err),
        () => console.log('create group completed')
      );
  };

  openCreateStaffModal() {
    const dialogRef = this.dialog.open(ModalStaffCreateComponent);

    //get the value of the modal's form before it closes
    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      if (result) {
       //success
       this.getAllStaffNoGroup();
      }
    });
  }
}
