import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalChildCreateComponent } from '../../modals/modal-child-create/modal-child-create.component';
import { FormGroup } from '@angular/forms';
import { ChildrenService } from 'src/app/shared/services/http/children.service';
import { MatTableDataSource } from '@angular/material/table';
import { ModalActionComponent } from '../../modals/modal-action/modal-action.component';
import { SignalRService } from 'src/app/shared/services/http/hub/SignalR.service';
import { AuthService } from 'src/app/shared/services/http/auth.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'nom', 'group'];
  children: any[] = [];
  dataSource = new MatTableDataSource(this.children);

  constructor(
    public dialog: MatDialog,
    public childrenService: ChildrenService,
    private signalRService: SignalRService,
    public authService: AuthService
  ) {
    //console.log('ChildrenComponent');
  }
  ngOnDestroy(): void {
    this.signalRService.removeChildAttendanceChangesListener();
  }

  ngOnInit(): void {
    //console.log('XOXOX',  this.authService.isUserInRole('employee'));

    //fetches children
    if (this.authService.isUserInRole('tutor')) {
      this.getChildren(true);
   //   console.warn('tutor');
      
    } else {
      this.getChildren(false);
  //    console.warn('OOPS not a tutor');

    }

    this.dataSource = new MatTableDataSource(this.children);

    this.signalRService.addChildAttendanceChangesListener(
      this.updateChildren.bind(this)
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalChildCreateComponent);

    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      if (result) {
        const newChild = result.value;

        let childCreate_request = {
          Nom: `${newChild.firstname} ${newChild.lastname}`,
          DateNaissance: newChild.dateOfBirth,
          GroupId: newChild.groupId,
        };

        //console.log('NEW ENFANT REQUEST', childCreate_request);
        this.createChild(childCreate_request);
        // location.reload();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateChildren(data?: any) {
    const index = this.children.findIndex((x) => x.id === data.enfantId);
    if (index != -1) {
      this.children[index].hasArrived = data.present;
    }

    //this.children[index].hasArrived = data.present;
  }
  getChildren(isTutor: boolean) {
    if (!isTutor) {
      this.childrenService.getChildren('Enfant/GetAll').subscribe({
        next: (res) => {
         console.log(res);

          // this.children = res.data;
          res.data.forEach((c: any) => {
            const child = {
              id: c.id,
              nom: c.nom,
              image: c.photoCouverture ,
              hexColor: c.hexColor,
              hasArrived: c.hasArrived,
              group: c.group,
            };
            this.children.push(child);
          });
          this.dataSource = new MatTableDataSource(this.children);
          console.log(this.children);
          
        },
        error: (err) => [
          console.error(err),
          //console.error(err.error.errors),
          alert(JSON.stringify(err.error.errors)),
        ],
        complete: () => console.log('getting all childs completed'),
      });

      return;
    }

    this.childrenService.getChildren('Enfant/GetAllTutorsChilds').subscribe({
      next: (res) => {
       // console.log(res);

        // this.children = res.data;
        res.data.forEach((c: any) => {
          const child = {
            id: c.id,
            nom: c.nom,
            image: c.image,
            hexColor: c.hexColor,
            hasArrived: c.hasArrived,
            group: c.group,
          };
          this.children.push(child);
        });
        this.dataSource = new MatTableDataSource(this.children);
      },
      error: (err) => [
        console.error(err),
        //console.error(err.error.errors),
        alert(JSON.stringify(err.error.errors)),
      ],
      complete: () => console.log('getting all childs completed'),
    });
  }

  createChild(child_request: any) {
    this.childrenService.createChild('Enfant/Create', child_request).subscribe({
      next: (res) => {
        //console.log(res);
      },
      error: (err) => [
        console.error(err),
        //console.error(err.error.errors),
        alert(JSON.stringify(err.error.errors)),
      ],
      complete: () => console.log('creating child completed'),
    });
  }

  openActionModal(child: any) {
    const dialogRef = this.dialog.open(ModalActionComponent, {
      data: child,
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
