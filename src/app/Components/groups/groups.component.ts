import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GroupService } from 'src/app/shared/services/http/group.service';
import { ModalGroupCreateComponent } from '../modals/modal-group-create/modal-group-create.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit {
  constructor(private groupService: GroupService, public dialog: MatDialog) {}

  ngOnInit() {
   
  }


  getAllGroups(){
    this.groupService
    .getAllGroups('Group/Get')
    .subscribe((res) => console.log(res));
  }
  
  openDialog(){
    const dialogRef = this.dialog.open(ModalGroupCreateComponent);

    //get the value of the modal's form before it closes
    dialogRef.beforeClosed().subscribe((result: FormGroup) => {
      if (result) {
        const group = result.value;
      }
    });
  }
}
