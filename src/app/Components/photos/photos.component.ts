import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PhotoService } from 'src/app/shared/services/http/photo.service';
import { ModalImagePreviewComponent } from '../modals/modal-image-preview/modal-image-preview.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  @ViewChild('fileuploadprogress', { static: false })
  fileuploadprogress?: ElementRef;

  constructor(public dialog: MatDialog, public photoService: PhotoService) {}

  ngOnInit() {
    this.getAllPhotosIds();
  }

  getAllPhotosIds() {
    this.photoService.getAllPhotosIds('Photos/GetPhotoIds').subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  onFileChange(event: any) {
    const selectedFiles = event.target.files;
    if (selectedFiles.length < 0) {
      return;
    }
    this.openImagePreviewDialog(selectedFiles);
  }

  openImagePreviewDialog(selectedFiles: any) {
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

  setNull() {
    //just unselect the files..
    this.fileuploadprogress!.nativeElement.value = null;
  }
}
