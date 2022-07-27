import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PhotoService } from 'src/app/shared/services/http/photo.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalImagePreviewComponent } from 'src/app/Components/modals/modal-image-preview/modal-image-preview.component';
import { ModalPreviewPictureComponent } from 'src/app/Components/modals/modal-preview-picture/modal-preview-picture.component';

@Component({
  selector: 'app-child-photos-tab',
  templateUrl: './child-photos-tab.component.html',
  styleUrls: ['./child-photos-tab.component.css'],
})
export class ChildPhotosTabComponent implements OnInit {
  //TODO: MAKE THIS PHOTO GALLERIE DISPLAY A COMPONENT BECAUSE ITS IS A COPY PASTE OF PHOTO 
  @Input() child_info!: any;
  @ViewChild('fileuploadprogress', { static: false })
  fileuploadprogress?: ElementRef;

  images: any[] = [];
  constructor(private photoService: PhotoService, public dialog: MatDialog) {}

  ngOnInit() {

    this.getPhotoIdsOfChild();
  }

  getPhotoIdsOfChild() {
    this.photoService.getPhotoIdsOfChild(`Photos/Gallerie/Get/${this.child_info.id}`).subscribe(
      (res) => {
        console.log(res);
        res.forEach((image: any) => {
          this.images.push(image);
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
        child_info : this.child_info,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        ///do something after success photo couverture upload?
      }
    });
  }

  openImagePreview(clickedImageIndex: any, images: any) {
    const dialogRef = this.dialog.open(ModalPreviewPictureComponent, {
      data: {
        images: images,
        index: clickedImageIndex,
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
