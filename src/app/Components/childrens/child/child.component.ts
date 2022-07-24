import { HttpEventType } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildrenService } from 'src/app/shared/services/http/children.service';
import { SignalRService } from 'src/app/shared/services/http/hub/SignalR.service';
import { PhotoService } from 'src/app/shared/services/http/photo.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit, OnDestroy {
  //Todo: using a service would be better instead of having multiples instance of child_info in each tabs
  child_info: any = {};
  @ViewChild('fileuploadprogress', { static: false })
  fileuploadprogress?: ElementRef;
  uploadProgress: number = 0;
  constructor(
    private signalRService: SignalRService,
    private childrenService: ChildrenService,
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.child_info.id = params['id'];
    });
    this.getChild();

    this.signalRService.addChildChangesListener(this.getChild.bind(this));
  }

  ngOnDestroy(): void {
    this.signalRService.removeChildChangesListener();
  }

  getChild = () => {
    this.childrenService
      .getChild(`Enfant/Get/${this.child_info.id}`)
      .subscribe({
        next: (res) => {
          //  console.log(res);

          this.child_info.image = res.data.image;
          this.child_info.nom = res.data.nom;
          this.child_info.birthdate = res.data.dateNaissance;
          this.child_info.groupId = res.data.group ? res.data.group.id : 0;
          this.child_info.hexColor = res.data.group
            ? res.data.group.hexColor
            : '';

          // console.log('CHILD_INFO', this.child_info);
        },
      });
  };

  uploadWithProgress() {
    this.uploadProgress = 0;
    if (this.fileuploadprogress != undefined) {
     
      let file = this.fileuploadprogress.nativeElement.files[0];
      console.log(file,'file');
      if (file === undefined) return;

      let formData = new FormData();
      formData.append('image', file, file.name);

      
      this.photoService.uploadWithProgress(`Photos/Couverture/Enfant/${this.child_info.id}`, formData).subscribe((res) => {
        if (res != undefined) {
          if (
            res.type === HttpEventType.UploadProgress &&
            res.total != undefined
          ) {
            this.uploadProgress = Math.round((100 * res.loaded) / res.total);
          } else {
            console.log('Photo uploaded');
            this.uploadProgress = 100;
          }
        }
      });
    }
  }
}
