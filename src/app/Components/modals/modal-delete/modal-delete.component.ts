import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {

  constructor(    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {  
    console.log(this.data);
    
  }

}
