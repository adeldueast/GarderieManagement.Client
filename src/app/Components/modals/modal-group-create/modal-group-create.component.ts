import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/http/users.service';

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
  staff: Staff[] = [
    // {value: 'steak-0', viewValue: 'Steak'},
    // {value: 'pizza-1', viewValue: 'Pizza'},
    // {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  form: FormGroup = new FormGroup({
    name: new FormControl(),
    educatriceId: new FormControl(),
  });
  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.getAllStaff();
  }

  getAllStaff = () => {
    this.userService.getAllStaff('User/employees').subscribe({
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
  
  onSelectChange(value: any) {
    console.log(value);
    this.form.patchValue({
      educatriceId: value,
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
