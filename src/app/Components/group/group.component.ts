import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentUrlService } from 'src/app/shared/services/EnvironmentUrl.service';
import { AuthService } from 'src/app/shared/services/http/auth.service';
import { GroupService } from 'src/app/shared/services/http/group.service';
import { SignalRService } from 'src/app/shared/services/http/hub/signal-r.service';
import { ModalActionComponent } from '../modals/modal-action/modal-action.component';
import { ModalDeleteComponent } from '../modals/modal-delete/modal-delete.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit, OnDestroy {
  group: any;
  constructor(
    public dialog: MatDialog,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private signalRService: SignalRService,
    private router:Router,
    public authService:AuthService, public envUrls: EnvironmentUrlService
  ) {}
  ngOnDestroy(): void {
    this.signalRService.removeChildAttendanceChangesListener();

    this.signalRService.removeChildChangesListener();

  }

  ngOnInit() { console.clear()
    let groupId ;
    this.route.params.subscribe((params) => {
      groupId = (params['id']);
      this.getGroupById(groupId)
    });
    this.signalRService.addChildAttendanceChangesListener(
      this.getGroupById.bind(this,groupId)
    );

    this.signalRService.addChildChangesListener(
      this.getGroupById.bind(this,groupId)
    );
    
  }
  updateChildState(data?: any) {
    const index = this.group.enfants.findIndex(
      (x: any) => x.id === data.enfantId
    );
    if (index != -1) {
      this.group.enfants[index].hasArrived = data.present;
    }
  }
  getGroupById(id?: number) {
    this.groupService.getGroupById(`Group/Get/${id}`).subscribe((res) => {
      this.group = res.data;
    // console.log(this.group);
    });
  }

  openActionModal(child: any) {
    const dialogRef = this.dialog.open(ModalActionComponent, {
      data: child,
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  openDeleteModal(groupName: string) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      data: groupName,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       // console.log('deleting group..');
        this.deleteGroup();
      }
    });
  }

  deleteGroup() {
    this.groupService
      .deleteGroup(`Group/Delete/${this.group.id}`)
      .subscribe((res) => {
        //console.log(res);
        this.router.navigate(['/groups'])
      },(err) => console.log(err));
  }
}
