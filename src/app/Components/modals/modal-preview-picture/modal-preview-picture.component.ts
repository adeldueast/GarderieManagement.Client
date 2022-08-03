import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnvironmentUrlService } from 'src/app/shared/services/EnvironmentUrl.service';
import { PhotoService } from 'src/app/shared/services/http/photo.service';

@Component({
  selector: 'app-modal-preview-picture',
  templateUrl: './modal-preview-picture.component.html',
  styleUrls: ['./modal-preview-picture.component.css'],
})
export class ModalPreviewPictureComponent implements OnInit {
  loading: boolean = true

  index!: number;
  image: any;
  constructor(
    public dialogRef: MatDialogRef<ModalPreviewPictureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public photoService: PhotoService,
    public envUrls: EnvironmentUrlService
  ) {
    this.index = this.data.index;
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data.fromNotif) {
      //console.warn('from notif');

      this.photoService
        .getPhotoInformation(`Photos/Get/${this.data.images[this.index].id}`)
        .subscribe(
          (res) => {
             ;
            this.data.images[this.index].description  = res.description; 
          },
          (err) => console.log(err),
          () => console.log('completed  ')
        );
    }
  }
  onLoad() {
    this.loading = false;
}
  previousImage() {
    if (!this.isFirstImage()) {
      this.loading = true;
      this.index -= 1;
    }
  }

  nextImage() {
    if (!this.isLastImage()) {
      this.loading = true;
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
