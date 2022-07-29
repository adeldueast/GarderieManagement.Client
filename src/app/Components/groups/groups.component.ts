import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/http/auth.service';
import { GroupService } from 'src/app/shared/services/http/group.service';
import { SignalRService } from 'src/app/shared/services/http/hub/SignalR.service';
import { ModalGroupCreateComponent } from '../modals/modal-group-create/modal-group-create.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit,OnDestroy {
  constructor(
    private groupService: GroupService,
    public dialog: MatDialog,
    private signalRService: SignalRService,
    public authService: AuthService
  ) {}
  groups: any = [];
  ngOnInit() {
    console.clear();
    this.getAllGroups();

    this.signalRService.addChildAttendanceChangesListener(
      this.getAllGroups.bind(this)
    );

    this.signalRService.addChildChangesListener(
      this.getAllGroups.bind(this)
    );

    this.signalRService.addGroupsChangesListener(
      this.getAllGroups.bind(this)
    );

  }


  ngOnDestroy(): void {
    this.signalRService.removeChildAttendanceChangesListener();

    this.signalRService.removeChildChangesListener();

    this.signalRService.removeGroupsChangesListener();


  }
  getAllGroups() {
    this.groupService.getAllGroups('Group/Get').subscribe({
      next: (res) => {
        console.log(res);
        this.groups = [];
        res.data.forEach((g: any) => {
          let group = {
            id: g.id,
            name: g.name,
            educatriceName: g.educatriceFullName,
            hexColor: g.hexColor,
            enfants: g.enfants,
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
        location.reload();
      }
    });
  }
}
