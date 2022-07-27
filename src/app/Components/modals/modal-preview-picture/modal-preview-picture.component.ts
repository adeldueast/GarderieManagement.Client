import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhotoService } from 'src/app/shared/services/http/photo.service';

@Component({
  selector: 'app-modal-preview-picture',
  templateUrl: './modal-preview-picture.component.html',
  styleUrls: ['./modal-preview-picture.component.css'],
})
export class ModalPreviewPictureComponent implements OnInit {
  index!: number;
  image: any;
  constructor(
    public dialogRef: MatDialogRef<ModalPreviewPictureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public photoService: PhotoService
  ) {
    this.index = this.data.index;
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data.fromNotif) {
      console.warn('from notif');

      this.photoService
        .getPhotoInformation(`Photos/Get/${this.data.images[this.index].id}`)
        .subscribe(
          (res) => {
            console.log(res);
            this.data.images[this.index].description  = res.description; 
          },
          (err) => console.log(err),
          () => console.log('completed  ')
        );
    }
  }

  previousImage() {
    if (!this.isFirstImage()) {
      this.index -= 1;
    }
  }

  nextImage() {
    if (!this.isLastImage()) {
      this.index += 1;
    }
  }

  isLastImage() {
    return !(this.index !== this.data.images.length - 1);
  }

  isFirstImage() {
    return !(this.index !== 0);
  }
}