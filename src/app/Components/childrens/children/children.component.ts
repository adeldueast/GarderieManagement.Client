import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalChildCreateComponent } from '../../modals/modal-child-create/modal-child-create.component';
import { FormGroup } from '@angular/forms';
import { ChildrenService } from 'src/app/shared/services/http/children.service';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nom'];
  children : any[] = [];
  dataSource = new MatTableDataSource(this.children);
  childCreate_request: any = undefined;

  constructor(
    public dialog: MatDialog,
    public childrenService: ChildrenService
  ) {}

  ngOnInit(): void {

  this.getChildren();

 
  
  this.dataSource = new MatTableDataSource(this.children);
  }
 
  openDialog() {
    const dialogRef = this.dialog.open(ModalChildCreateComponent);

    dialogRef.beforeClosed().subscribe((result: FormGroup) => {
      if (result) {
        const enfant = result.value;
        this.childCreate_request = {
          Nom: `${enfant.firstname} ${enfant.lastname}`,
          DateNaissance: enfant.dateOfBirth,
        };
        console.log('before closing ...', this.childCreate_request);
        this.createChild();
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
       
        this.children = res.data;
        this.dataSource = new  MatTableDataSource(this.children);
        
        
      },
      error: (err) => [
        console.error(err),
        //console.error(err.error.errors),
        alert(JSON.stringify(err.error.errors)),
      ],
      complete: () => console.log('getting all child completed'),
    })
  }
  
   createChild() {
    this.childrenService
      .createChild('Enfant/Create', this.childCreate_request)
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


}
