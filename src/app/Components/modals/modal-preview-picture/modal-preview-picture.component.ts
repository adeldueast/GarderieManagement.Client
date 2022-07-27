import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.index = this.data.index;
  }

  ngOnInit() {}

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
