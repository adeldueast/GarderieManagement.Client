import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PhotoService } from 'src/app/shared/services/http/photo.service';

@Component({
  selector: 'app-modal-image-preview',
  templateUrl: './modal-image-preview.component.html',
  styleUrls: ['./modal-image-preview.component.css'],
})
export class ModalImagePreviewComponent implements OnInit {
  uploadProgress: number = 0;
  imageURL?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private photoService: PhotoService,
    public dialogRef: MatDialogRef<ModalImagePreviewComponent>
  ) {}

  ngOnInit() {
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(this.data.file);
  }

  // Submit Form
  submit() {
    let formData = new FormData();
    formData.append('image', this.data.file, this.data.file.name);

    this.photoService
      .uploadWithProgress(
        `Photos/Couverture/Enfant/${this.data.childId}`,
        formData
      )
      .subscribe(
        (res) => {
          if (res != undefined) {
            if (
              res.type === HttpEventType.UploadProgress &&
              res.total != undefined
            ) {
              this.uploadProgress = Math.round((100 * res.loaded) / res.total);
            } else {
              this.uploadProgress = 100;
            }
          }
        },
        (err) => {
          console.log(err),
          this.dialogRef.close(false)

        },
        () => {
          console.log('Photo uploaded'),
          this.dialogRef.close(true)
        }
      );
  }
}
