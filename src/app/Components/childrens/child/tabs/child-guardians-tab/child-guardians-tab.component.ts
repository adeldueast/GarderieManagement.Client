import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGuardianCreateComponent } from 'src/app/Components/modals/modal-guardian-create/modal-guardian-create.component';
import { UsersService } from 'src/app/shared/services/http/users.service';

@Component({
  selector: 'app-child-guardians-tab',
  templateUrl: './child-guardians-tab.component.html',
  styleUrls: ['./child-guardians-tab.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChildGuardiansTabComponent implements OnInit {
  //List of all guardians *needs to be fetched*
  guardians: any[] = [];

  //List of all child's guardians *needs to be fetched*
  childsGuardians: any[] = [];

  @Input() child_info!: any;
  constructor(public dialog: MatDialog, private usersService: UsersService) {
    console.log('guardians tab constructor');
  }

  ngOnInit() {
    this.getAllGuardians();
    this.getAllChildsGuardians();
  }

  private getAllGuardians = () => {
    this.usersService.getAllGuardians(`User/tutors`).subscribe({
      next: (res) => {
        res.data.forEach((g: any) => {
          let guardian = {
            id: g.id,
            name: `${g.firstName} ${g.lastName}`,
            email: g.email,
          };
          this.guardians.push(guardian);
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

  private getAllChildsGuardians = () => {
    this.usersService
      .getAllChildsGuardians(`User/ChildsTutors?enfantId=${this.child_info.id}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          
          res.data.forEach((g: any) => {
            let guardian = {
              id: g.applicationUser.id,
              name: `${g.applicationUser.firstName} ${g.applicationUser.lastName}`,
              email: g.applicationUser.email,
              hasAccount:g.applicationUser.hasAccount,
              relation: g.relation,
              emergencyContact: g.emergencyContact,
              authorizePickup: g.authorizePickup,
            };
            this.childsGuardians.push(guardian);
          });
          // console.log(this.childsGuardians);
        },
        error: (err) => [
          console.error(err),
          //console.error(err.error.errors),
          alert(JSON.stringify(err.error.errors)),
        ],
        complete: () => console.log("getting only child's guardians completed"),
      });
  };

  editChildTutorRelation = (guardian: any) => {
    this.openDialog(true, guardian);
  };
  openDialog(editingRelation?: boolean, selectedGuardian?: any) {
    const dialogRef = this.dialog.open(ModalGuardianCreateComponent, {
      data: {
        enfantId: this.child_info.id,
        enfantName: this.child_info.nom,
        guardians: this.guardians,
        editingRelation: editingRelation ? editingRelation : false,
        selectedGuardian: editingRelation ? selectedGuardian : undefined,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result.value);

        const authorizePickup = result.value.authorizePickup;
        const emergencyContact = result.value.emergencyContact;

        const email = result.value.email;
        const index = this.childsGuardians.findIndex((item) => item.email == email);
         if (index != -1) {
          this.childsGuardians[index].authorizePickup = authorizePickup;
          this.childsGuardians[index].emergencyContact = emergencyContact;
        }

      }
    });
  }
}
