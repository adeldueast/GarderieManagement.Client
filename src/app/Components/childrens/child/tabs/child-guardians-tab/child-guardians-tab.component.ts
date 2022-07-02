import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGuardianCreateComponent } from 'src/app/Components/modals/modal-guardian-create/modal-guardian-create.component';



@Component({
  selector: 'app-child-guardians-tab',
  templateUrl: './child-guardians-tab.component.html',
  styleUrls: ['./child-guardians-tab.component.css']
})
export class ChildGuardiansTabComponent implements OnInit {


  @Input() child_info!:any;
  constructor(  public dialog: MatDialog) {
    
    console.log('constructor',this.child_info);

  }

  ngOnInit() {

    console.log('ngOnInit',this.child_info);
  }

    
  openDialog() {
    const dialogRef = this.dialog.open(ModalGuardianCreateComponent,{
      data: {
        enfantId: this.child_info.id,
        enfantName: this.child_info.nom,
      }
    });
    dialogRef.beforeClosed().subscribe((result) => {
     // console.log(result);
    });
  }
}
