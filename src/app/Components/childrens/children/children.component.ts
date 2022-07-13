import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalChildCreateComponent } from '../../modals/modal-child-create/modal-child-create.component';
import { FormGroup } from '@angular/forms';
import { ChildrenService } from 'src/app/shared/services/http/children.service';
import { MatTableDataSource } from '@angular/material/table';
import { ModalActionComponent } from '../../modals/modal-action/modal-action.component';
import { SignalRService } from 'src/app/shared/services/http/hub/SignalR.service';




@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent implements OnInit,OnDestroy {

  displayedColumns: string[] = ['id', 'nom'];
  children : any[] = [];
  dataSource = new MatTableDataSource(this.children);
 

  constructor(
    public dialog: MatDialog,
    public childrenService: ChildrenService,
    private signalRService:SignalRService
  ) {
    //console.log('ChildrenComponent');
    
  }
  ngOnDestroy(): void {
  
    this.signalRService.removeChildAttendanceChangesListener()
   

  }

  ngOnInit(): void {

    //fetches children
  this.getChildren();


  this.dataSource = new MatTableDataSource(this.children);
  this.signalRService.addChildAttendanceChangesListener(this.getChildren.bind(this))
  
  }
 
  openDialog() {
    const dialogRef = this.dialog.open(ModalChildCreateComponent);

    dialogRef.afterClosed().subscribe((result: FormGroup) => {
      if (result) {


        const newChild = result.value;
     
     
        let childCreate_request = {
          Nom: `${newChild.firstname} ${newChild.lastname}`,
          DateNaissance: newChild.dateOfBirth,
          GroupId: newChild.groupId
        };
      
        console.log('NEW ENFANT REQUEST', childCreate_request);
        this.createChild(childCreate_request);
        location.reload();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getChildren(){
    this.childrenService.getChildren('Enfant/GetAll').subscribe({
      next: (res) => {
      // console.log(res);
       
        this.children = res.data;
        this.dataSource = new  MatTableDataSource(this.children);
        
        
      },
      error: (err) => [
        console.error(err),
        //console.error(err.error.errors),
        alert(JSON.stringify(err.error.errors)),
      ],
      complete: () => console.log('getting all childs completed'),
    })
  }
  
   createChild(child_request:any) {
    this.childrenService
      .createChild('Enfant/Create', child_request)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => [
          console.error(err),
          //console.error(err.error.errors),
          alert(JSON.stringify(err.error.errors)),
        ],
        complete: () => console.log('creating child completed'),
      });
  }

  openActionModal(child:any){


    
    const dialogRef = this.dialog.open(ModalActionComponent,{
      data: child,
    });

    dialogRef.afterClosed().subscribe(() => {
   
    });
  }

}
