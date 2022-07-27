import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PhotoService } from 'src/app/shared/services/http/photo.service';
import { ModalImagePreviewComponent } from '../modals/modal-image-preview/modal-image-preview.component';
import { ModalPreviewPictureComponent } from './../modals/modal-preview-picture/modal-preview-picture.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  @ViewChild('fileuploadprogress', { static: false })
  fileuploadprogress?: ElementRef;

  images : any[] = []
  constructor(public dialog: MatDialog, public photoService: PhotoService) {}

  ngOnInit() {
    this.getAllPhotosIds();
  }

  getAllPhotosIds() {
    this.photoService.getAllPhotosIds('Photos/Gallerie/Get').subscribe(
      (res) =>{
        console.log(res)
        res.forEach((image:any) => {
          this.images.push(image)
        });
      },
      (err) => console.log(err)
    );
  }
  onFileChange(event: any) {
    const selectedFiles = event.target.files;
    if (selectedFiles.length < 0) {
      return;
    }
    this.openImagesSelectDialog(selectedFiles);
  }

  openImagesSelectDialog(selectedFiles: any) {
    const dialogRef = this.dialog.open(ModalImagePreviewComponent, {
      data: {
        selectedFiles: selectedFiles,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        ///do something after success photo couverture upload?
      }
    });
  }

  openImagePreview(clickedImageIndex:any, images:any){
    const dialogRef = this.dialog.open(ModalPreviewPictureComponent, {
      data: {
        images: images,
        index: clickedImageIndex
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        
      }
    });
  }

  setNull() {
    //just unselect the files..
    this.fileuploadprogress!.nativeElement.value = null;
  }
}
