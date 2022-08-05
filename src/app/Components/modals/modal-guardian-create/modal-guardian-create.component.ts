import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

import { UsersService } from 'src/app/shared/services/http/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/http/auth.service';
@Component({
  selector: 'app-modal-guardian-create',
  templateUrl: './modal-guardian-create.component.html',
  styleUrls: ['./modal-guardian-create.component.css'],
})
export class ModalGuardianCreateComponent implements OnInit {
  form!: FormGroup;
  showForm: boolean = this.data.showForm;
  isCreatingGuardian: boolean = false;
  selectedUser?: any;

  //List of all guardians *needs to be passed from the Guardians-Tab*
  guardians: any[] = [];

  //SearchControl where we filter guardian by Name
  myControl = new FormControl('');

  //A subscription to filter changes of the above control
  filteredGuardians?: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<ModalGuardianCreateComponent>,
    public authService: AuthService,
    private usersService: UsersService,
    // data is just some data passed from child component to this modal (children && childName)
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //console.log(this.data);

    //Instanciate the form and set enfantId to data.EnfantId
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(
        authService.isUserInRole('tutor') ? null : '',
        Validators.required
      ),

      //new props
      HasAnAccount: new FormControl(
        authService.isUserInRole('tutor') ? false : true
      ),
      emergencyContact: new FormControl(true),
      authorizePickup: new FormControl(true),

      relation: new FormControl('', Validators.required),
      enfantId: new FormControl(this.data.enfantId),
    });
  }

  ngOnInit() {
    //Fetches all guardian and fill up => this.guardians: any[]
    this.guardians = this.data.guardians;
    //console.warn(this.guardians);
    

    //updates the select list based on the filter value entered
    this.filteredGuardians = this.myControl.valueChanges.pipe(
      startWith(''),
      // only filter if they input-search is at least 3 letters, other wise returns empty array
      map((value) => {
        if (value.length > 1) {
          const name =
            typeof value === 'string'
              ? value
              : `${value?.firstname} ${value?.lastname}`;
          return name ? this._filter(name as string) : this.guardians.slice();
        }
        return [];
      })
    );

    if (this.data.editingRelation) {
      //if we only updating a relation of existing one

      const existing_guardian = {
        value: this.data.selectedGuardian,
      };
      this.OnGuardianSelected(existing_guardian);
    }
  }

  public displayFn = (guardian: any) => {
    return guardian && guardian.name ? guardian.name : guardian;
  };

  public OnGuardianSelected = (event: any) => {
    //OnOptionSelected , get the whole object of selected option
    this.selectedUser = this.data.editingRelation
      ? this.data.selectedGuardian
      : event.value;
    // console.log(this.selectedUser, 'XOXOXOX');
    //either a guardian object was selected or 'Create a new guardian option'
    this.showForm = true;
    if (typeof this.selectedUser === 'string') {
      //We are creating a new guardian for currente child, so enable the form
      return (this.isCreatingGuardian = true), this.form.enable();
    }

    //We assigning existing guardian for furrent child, so disable the form to display its info except for the relation
    this.isCreatingGuardian = false;
    for (var control in this.form.controls) {
      if (
        control != 'relation' &&
        control != 'emergencyContact' &&
        control != 'authorizePickup' &&
        control != 'HasAnAccount'
      ) {
        this.form.controls[control].disable();
      } else {
        this.form.controls[control].enable();
      }
    }

    //display the selected guardian's information on the form
    const first = this.selectedUser.name.split(' ')[0];
    const last = this.selectedUser.name.split(' ')[1];
    this.form.patchValue({
      firstName: first,
      lastName: last,
      email: this.selectedUser.email,
      enfantId: this.data.enfantId,
      relation:
        this.selectedUser.relation != undefined
          ? this.selectedUser.relation
          : undefined,
      emergencyContact:
        this.selectedUser.emergencyContact != undefined
          ? this.selectedUser.emergencyContact
          : true,
      authorizePickup:
        this.selectedUser?.authorizePickup != undefined
          ? this.selectedUser?.authorizePickup
          : true,
    });

    return;
  };

  public onSubmit = () => {
    const formValue = this.form.value;

    if (this.form.valid) {
      if (this.showForm && this.isCreatingGuardian) {
        return this.createGuardianForChild(formValue);
      }

      return this.AssignGuardianToChild(formValue);
    }
  };

  private createGuardianForChild = (formValue: any) => {
    this.usersService
      .createGuardian('Account/InviteTutor', {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        relation: formValue.relation,
        enfantId: this.data.enfantId,
        emergencyContact: formValue.emergencyContact,
        HasAnAccount: formValue.HasAnAccount,
        authorizePickup: formValue.authorizePickup,
      })

      .subscribe({
        next: (res) => {
          // console.log('res', res),
          this.dialogRef.close(this.form);

          this.form.enable();
        },
        error: (err) => [console.error(err), alert(err.error.errors)],
        complete: () => {
          console.log('Created guardian and assigned to child completed');
        },
      });
  };

  private AssignGuardianToChild = (formValue: any) => {
    this.usersService
      .assignGuardian('Enfant/AssignTutorToEnfant', {
        tutorId: this.selectedUser.id,
        enfantId: this.data.enfantId,
        relation: formValue.relation,
        emergencyContact: formValue.emergencyContact,
        // HasAnAccount: formValue.HasAnAccount,
        authorizePickup: formValue.authorizePickup,
      })
      .subscribe({
        next: (res) => {
          //console.log('res', res),
          this.dialogRef.close(this.form);

          this.form.enable();
        },
        error: (err) => [console.error(err), alert(err.error.errors)],
        complete: () => {
          console.log('Assigned guardian to child completed');
        },
      });
  };

  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    const filteredUsers = this.guardians.filter((guardian) =>
      guardian.name.toLowerCase().includes(filterValue)
    );

    if (filteredUsers.length > 0) {
      //return filtered existing guardians options
      return filteredUsers;
    }
    //return create new guardian option
    return ['Create a new guardian'];
  }
}
