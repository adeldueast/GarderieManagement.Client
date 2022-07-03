import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGuardianCreateComponent } from 'src/app/Components/modals/modal-guardian-create/modal-guardian-create.component';
import { UsersService } from 'src/app/shared/services/http/users.service';

@Component({
  selector: 'app-child-guardians-tab',
  templateUrl: './child-guardians-tab.component.html',
  styleUrls: ['./child-guardians-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChildGuardiansTabComponent implements OnInit {
  typesOfShoes: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];

  //List of all guardians *needs to be fetched*
  guardians: any[] = [];

  //List of all child's guardians *needs to be fetched*
  childsGuardians: any[] = [];

  @Input() child_info!: any;
  constructor(public dialog: MatDialog, private usersService: UsersService) {
    
  }

  ngOnInit() {
    this.getAllGuardians();
    this.getAllChildsGuardians()

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
    this.usersService.getAllChildsGuardians(`User/ChildsTutors?enfantId=${this.child_info.id}`).subscribe({
      next: (res) => {
        console.log(res);
        
        res.data.forEach((g: any) => {
          let guardian = {
            id: g.applicationUser.id,
            name: `${g.applicationUser.firstName} ${g.applicationUser.lastName}`,
            email: g.applicationUser.email,
            relation : g.relation
            
          };
          this.childsGuardians.push(guardian);
          console.log(this.childsGuardians);
          
        });
      },
      error: (err) => [
        console.error(err),
        //console.error(err.error.errors),
        alert(JSON.stringify(err.error.errors)),
      ],
      complete: () => console.log("getting only child's guardians completed"),
    });
  };

  openDialog() {
    const dialogRef = this.dialog.open(ModalGuardianCreateComponent, {
      data: {
        enfantId: this.child_info.id,
        enfantName: this.child_info.nom,
        guardians: this.guardians,
      },
    });
    //todo: pass the created guardian back toe the tab componenent to display it
    dialogRef.beforeClosed().subscribe((result) => {
      // console.log(result);
    });
  }

  selectedChange() {
    console.log('aa');
  }
}
