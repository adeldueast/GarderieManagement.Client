import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
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
  groups: any = [];
  ngOnInit() {
    this.getAllGroups();
  }

  getAllGroups() {
    this.groupService.getAllGroups('Group/Get').subscribe({
      next: (res) => {
        console.log(res);
        res.data.forEach((g: any) => {
          let group = {
            id: g.id,
            name: g.name,
            educatriceName: g.educatriceFullName,
            hexColor: g.hexColor,
            enfantsIds: g.enfantsIds
          };

          this.groups.push(group);
        });

        //console.log(this.groups);
      },
      error: (err) => console.log(err),
      complete: () => console.log('fetching all groups completed'),
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalGroupCreateComponent);

    //get the value of the modal's form before it closes
    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      if (result) {
        const group = result.value;
        location.reload()
      }
      
    });
  }
}
