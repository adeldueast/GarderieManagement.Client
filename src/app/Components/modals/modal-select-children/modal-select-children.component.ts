import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChildrenService } from 'src/app/shared/services/http/children.service';
import { map } from 'rxjs';
import { PhotoService } from 'src/app/shared/services/http/photo.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-modal-select-children',
  templateUrl: './modal-select-children.component.html',
  styleUrls: ['./modal-select-children.component.css'],
})
export class ModalSelectChildrenComponent implements OnInit {
  groupedChildren: any[] = [];
  isExpandCategory = new Map([]);

  firstFormGroup = this._formBuilder.group({
    selectedChildrenControl: [[], Validators.minLength(1)],
    description: ['', Validators.required],
  });

  constructor(
    private childrenService: ChildrenService,
    public _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private photoService: PhotoService,
    public dialogRef: MatDialogRef<ModalSelectChildrenComponent>
  ) {}

  ngOnInit() {
    console.clear();
    this.getChildren();

    console.log(this.data.formData.getAll('image'));
  }

  getChildren() {
    this.childrenService.getChildren('Enfant/GetAll').subscribe({
      next: (res) => {
        this.groupedChildren = res.data.reduce(function (
          group: any,
          enfant: any
        ) {
          group[enfant.group] = group[enfant.group] || [];
          group[enfant.group].push(enfant);
          return group;
        },
        Object.create(null));

        // console.log(this.childrensGroups);

        Object.entries(this.groupedChildren).forEach(([key, value], index) => {
          // 👇️ name Tom 0, country Chile 1
          //console.log(key, value, index);
          this.isExpandCategory.set(key, false);
        });

        // console.log(this.isExpandCategory);
        // console.log(this.groupedChildren);
      },

      error: (err) => [
        console.error(err),
        //console.error(err.error.errors),
        alert(JSON.stringify(err.error.errors)),
      ],
      complete: () => console.log('getting all childs completed'),
    });
  }

  expandDocumentTypes(groupKey: any) {
    console.warn('collapse');
    
    this.isExpandCategory.set(groupKey, !this.isExpandCategory.get(groupKey));
    // expand only selected parent dropdown category with that childs
  }

  isChecked(groupKey: any) {
    if (groupKey === 'null') {
      groupKey = null;
    }
    const isChecked = this.firstFormGroup
      .get('selectedChildrenControl')
      ?.value.some((child: any) =>
        groupKey === null ? child.group == groupKey : child.group === groupKey
      );
    return isChecked;
  }

  toggleSelection(event: any, group: any) {
    let selectedChildrens = this.firstFormGroup.get('selectedChildrenControl')
      ?.value
      ? this.firstFormGroup.get('selectedChildrenControl')?.value
      : [];

    if (event.checked) {
      // console.log('event checked true');
      group.value.forEach((child: any) => {
        if (!selectedChildrens.some((c: any) => c.id === child.id)) {
          selectedChildrens.push(child);
        }
      });
    } else {
      //console.log('event checked false');
      group.value.forEach((child: any) => {
        selectedChildrens = selectedChildrens.filter(function (obj: any) {
          return obj.id !== child.id;
        });
      });
    }

    this.firstFormGroup
      .get('selectedChildrenControl')
      ?.setValue(selectedChildrens);
  }
  onSelectChanges(event: any) {
    console.log(event?.value);
  }

  onSubmit() {
    const childrenIds = this.firstFormGroup
      .get('selectedChildrenControl')!
      .value.map((child: any) => child.id);

    const photosDescription = this.firstFormGroup.get('description')?.value;


    
    let formData = this.data.formData as FormData;
    formData.set('enfants', childrenIds);
    formData.set('description',photosDescription);

    console.warn(formData.getAll('files'));
    console.warn(formData.getAll('enfants'));
    this.photoService
      .postGallerieEnfant(`Photos/Gallerie/Enfant`, formData)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );

    this.dialogRef.close(true);
  }
}
