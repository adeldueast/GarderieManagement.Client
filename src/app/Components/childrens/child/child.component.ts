import { HttpEventType } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ChildrenService } from 'src/app/shared/services/http/children.service';
import { SignalRService } from 'src/app/shared/services/http/hub/SignalR.service';
import { ModalImagePreviewComponent } from '../../modals/modal-image-preview/modal-image-preview.component';

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


  uploadForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private signalRService: SignalRService,
    private childrenService: ChildrenService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    // Reactive Form
    this.uploadForm = this.fb.group({
      avatar: [null],
    });
  }
  setNull() {
    this.fileuploadprogress!.nativeElement.value = null;
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.child_info.id = params['id'];
    });
  
   const a  = this.route
    .queryParams
    .subscribe(params => {
     
      
      // Defaults to 0 if no query param provided.
      this.child_info.image = params['imageId'] || null;
      console.log( this.child_info.image);
      
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
          //console.log(res);
          this.child_info.image = res.data.image;
          this.child_info.nom = res.data.nom;
          this.child_info.birthdate = res.data.dateNaissance;
          this.child_info.groupId = res.data.group ? res.data.group.id : 0;
          this.child_info.hexColor = res.data.group
            ? res.data.group.hexColor
            : '';

          console.log('CHILD_INFO', this.child_info);
        },
      });
  };

  showPreview(event: any) {
    const file = (event.target as HTMLInputElement).files![0];

    if (!file) {
      return;
    }

    this.uploadForm.patchValue({
      avatar: file,
    });
    this.uploadForm.get('avatar')?.updateValueAndValidity();
    this.openDialog(file);
  }

  openDialog(file: any) {
    const dialogRef = this.dialog.open(ModalImagePreviewComponent, {
      data: {
        uploadForm: this.uploadForm,
        file: file,
        childId: this.child_info.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       ///do something after success photo couverture upload?
       
      }
    });
  }
}
