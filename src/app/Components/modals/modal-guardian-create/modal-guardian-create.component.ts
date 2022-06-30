import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { AuthService } from 'src/app/shared/services/http/auth.service';
import { UsersService } from 'src/app/shared/services/http/users.service';

@Component({
  selector: 'app-modal-guardian-create',
  templateUrl: './modal-guardian-create.component.html',
  styleUrls: ['./modal-guardian-create.component.css'],
})
export class ModalGuardianCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl({ name: '' }),
    lastName: new FormControl({ name: '' }),
    Email: new FormControl({ name: '' }),
    name: new FormControl({ name: '' }),
  });

  //SearchControl where we filter guardian by Name
  myControl = new FormControl('');
  //List of all guardians *needs to be fetched*
  guardians: any[] = [];
  //A subscription to filter on value changes of the above control 
  filteredOptions?: Observable<any[]>;

  constructor(private usersService: UsersService) {}

  ngOnInit() {

    //Fetches all guardian
    this.getAllGuardians();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      // only filter if they input-search is at least 3 letters, other wise returns empty array
      map((value) => {
     
        
        if (value.length > 2) {
          
          const name =
            typeof value === 'string'
              ? value
              : `${value?.firstname} ${value?.lastname}`
          return name ? this._filter(name as string) : this.guardians.slice();
        }
        return [];
      })
    );
  }

  private _filter(name: string): string[] {
  

    const filterValue = name.toLowerCase();

    return this.guardians.filter((guardian) =>
    guardian.name.toLowerCase().includes(filterValue)
    );

    // if (filteredUsers.length > 0) {
    //   //existing guardians
    //   return filteredUsers;
    // }
    // //create new guardian
    // return ['Create a new guardian'];
  }
  
  displayFn(guardian: any): string {
    return guardian && guardian.name ? guardian.name : '';
  }

  getAllGuardians = () => {
    this.usersService.getAllGuardians(`User/tutors`).subscribe({
      next: (res) => {
        res.data.forEach((g: any) => {
          let guardian = {
            id: g.id,
            name: `${g.firstName} ${g.lastName}`,
            email: g.email,
          };
          this.guardians.push(guardian);
          //console.log(this.options);
          
        });
      },
      error: (err) => [
        console.error(err),
        //console.error(err.error.errors),
        alert(JSON.stringify(err.error.errors)),
      ],
      complete: () => console.log('getting all guardians completed'),
    });
  };

  OnGuardianSelected = (event: any) => {
    //get the whole object of selected option
    console.log(event.value);
    const selectedUser = event.value;
  };

  createGuardianForChild() {
    this.usersService
      .createGuardian('Account/InviteTutor', {
        firstname: 'Alex',
        lastname: 'Belanger',
        Email: 'alex.belanger@hotmail.com',
        relation: 'Pere',
        enfantId: 3,
      })
      .subscribe((res) => console.log(res));
  }
}
