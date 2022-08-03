import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PhotoService } from 'src/app/shared/services/http/photo.service';
import { ModalSelectChildrenComponent } from '../modal-select-children/modal-select-children.component';

@Component({
  selector: 'app-modal-image-preview',
  templateUrl: './modal-image-preview.component.html',
  styleUrls: ['./modal-image-preview.component.css'],
})
export class ModalImagePreviewComponent implements OnInit {
  uploadProgress: number = 0;

  previews: any[] = [];

  constructor(

    private photoService: PhotoService,
    public dialogRef: MatDialogRef<ModalImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

 
    
    //display selected Files..
    this.previews = [];
    const selectedFiles = this.data.selectedFiles;
    if (selectedFiles) {
      const numberOfFiles = selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(selectedFiles[i]);
      }
    }
  }

  // Select Children and pass files..
  selectChildren() {
    let formData = new FormData();
    const selectedFiles = this.data.selectedFiles;
    for (const file of selectedFiles) {
      //console.log(file);
      formData.append('files', file);
    }

    //open Select Children Dialog and pass the formData
    this.openSelectChildrenDialog(formData);
  }

  postPhotoCouverture() {
    let formData = new FormData();
    const selectedFiles = this.data.selectedFiles;
    formData.append('files',selectedFiles[0],selectedFiles[0].name)


   // console.log(formData.getAll('files'));

   
    this.photoService
      .postCouvertureEnfant(
        `Photos/Couverture/Enfant/${this.data.childId}`,
        formData
        
      )
      .subscribe(
        (res:any) => {
         // console.log(res);
          
          if (res != undefined) {
            if (
              res.type === HttpEventType.UploadProgress &&
              res.total != undefined
            ) {
              this.uploadProgress = Math.round((100 * res.loaded) / res.total);
            } else {
              this.uploadProgress = 100;
              this.dialogRef.close(res.body)
            }
          }
        
        },
        (err) => {
          console.log(err), this.dialogRef.close(false);
        },
        () => {
          console.log('Photo uploaded');
        }
      );
  }

  openSelectChildrenDialog(formData: FormData) {
    const dialogRef = this.dialog.open(ModalSelectChildrenComponent, {
      data: {
        formData: formData,
        child_info: this.data.child_info
      },
    });
    dialogRef.beforeClosed().subscribe(result=>{
      if(result){
        //console.log(result);
        this.dialog.closeAll()
        
      }
    })
  }
}
