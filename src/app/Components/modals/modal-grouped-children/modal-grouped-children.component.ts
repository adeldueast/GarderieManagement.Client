import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ChildrenService } from 'src/app/shared/services/http/children.service';
import { take } from 'rxjs/operators';
import { JournalService } from './../../../shared/services/http/journal.service';

@Component({
  selector: 'app-modal-grouped-children',
  templateUrl: './modal-grouped-children.component.html',
  styleUrls: ['./modal-grouped-children.component.css'],
})
export class ModalGroupedChildrenComponent implements OnInit {
  //TODO: CLEAN THIS MESS!!!! could do way better.
  @ViewChild('autosize') autosize?: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize?.resizeToFitContent(true));
  }

  firstFormGroup = this._formBuilder.group({
    selectedChildrenControl: [[], Validators.minLength(2)],
  });

  secondFormGroup = this._formBuilder.group({
    ratings: new FormControl([]),
    activite_message: ['', Validators.required],
    manger_message: ['', Validators.required],
  });

  isExpandCategory = new Map([]);

  groupedChildren: any[] = [];

  constructor(
    private _ngZone: NgZone,
    public _formBuilder: FormBuilder,
    private childrenService: ChildrenService,
    private journalService: JournalService
  ) {}

  ngOnInit() { 
    this.getChildren();
  }
  get activiteFormGroup(): FormGroup {
    return this.secondFormGroup?.get('activite_message') as FormGroup;
  }

  get mangerFormGroup(): FormGroup {
    return this.secondFormGroup?.get('manger_message') as FormGroup;
  }
  onSubmit() {
    //console.log(this.secondFormGroup.value);

    this.journalService
      .createGroupedJournals('Journal/Create', this.secondFormGroup.value)
      .subscribe(
        (res) => {
          //console.log(res)
        },
        (err) => console.log(err)
      );
  }

  onSelectChanges(event: any) {
    let ratings = this.secondFormGroup.get('ratings')?.value
      ? this.secondFormGroup.get('ratings')?.value
      : [];

    if (event.isUserInput) {
      const selectedChild = event.source.value;
      const selected = event.source.selected;

      if (selected) {
        console.log('XOOXOX', selectedChild);

        if (!ratings.some((c: any) => c.id === selectedChild.id)) {
          ratings.push({
            id: selectedChild.id,
            nom: selectedChild.nom,
            image: selectedChild.photoCouverture,
            Humeur_Rating: 0,
            Manger_Rating: 0,
            Participation_Rating: 0,
            Toilette_Rating: 0,
          });
        }
      } else {
        ratings = ratings.filter(function (obj: any) {
          return obj.id !== selectedChild.id;
        });
      }

      this.secondFormGroup.get('ratings')?.setValue(ratings);
    }
  }

  onSelectChanges2(event: any) {
   // console.log(event?.value);
  }

  toggleSelection(event: any, group: any) {
    let ratings = this.secondFormGroup.get('ratings')?.value
      ? this.secondFormGroup.get('ratings')?.value
      : [];

    let selectedChildrens = this.firstFormGroup.get('selectedChildrenControl')
      ?.value
      ? this.firstFormGroup.get('selectedChildrenControl')?.value
      : [];

    if (event.checked) {
     // console.log('event checked true');
      group.value.forEach((child: any) => {
        if (!selectedChildrens.some((c: any) => c.id === child.id)) {
          selectedChildrens.push(child);
          console.log(child);
          
          ratings.push({
            id: child.id,
            nom: child.nom,
            image: child.photoCouverture,
            Humeur_Rating: 0,
            Manger_Rating: 0,
            Participation_Rating: 0,
            Toilette_Rating: 0,
          });
        }
      });
    } else {
      //console.log('event checked false');
      group.value.forEach((child: any) => {
        selectedChildrens = selectedChildrens.filter(function (obj: any) {
          return obj.id !== child.id;
        });
        ratings = ratings.filter(function (obj: any) {
          return obj.id !== child.id;
        });
      });
    }

    this.firstFormGroup
      .get('selectedChildrenControl')
      ?.setValue(selectedChildrens);
    this.secondFormGroup.get('ratings')?.setValue(ratings);

    //(this.secondFormGroup.get('ratings')?.value);
    //console.log(this.firstFormGroup.get('ratings')?.value);
  }

  isChecked(groupKey: string) {
    const isChecked = this.firstFormGroup
      .get('selectedChildrenControl')
      ?.value.some((child: any) => child.group === groupKey);
    return isChecked;
  }
  //#region
  expandDocumentTypes(groupKey: any) {
    this.isExpandCategory.set(groupKey, !this.isExpandCategory.get(groupKey));
    // expand only selected parent dropdown category with that childs
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
  onHumeurRatingChanged(event: any) {
    const index = event.index;
    const rating = event.rating;

  //  console.warn(index,rating);
    
    let ratings = this.secondFormGroup.get('ratings')?.value;
    //console.log(ratings);

    ratings[index].Humeur_Rating = rating;
    this.secondFormGroup.get('ratings')?.setValue(ratings);
  }

  onMangerRatingChanged(event: any) {
    const index = event.index;
    const rating = event.rating;
    let ratings = this.secondFormGroup.get('ratings')?.value;
    //console.log(ratings);

    ratings[index].Manger_Rating = rating;
    this.secondFormGroup.get('ratings')?.setValue(ratings);
  }

  onParticipationRatingChanged(event: any) {
    const index = event.index;
    const rating = event.rating;
    let ratings = this.secondFormGroup.get('ratings')?.value;
    //console.log(ratings);

    ratings[index].Participation_Rating = rating;
    this.secondFormGroup.get('ratings')?.setValue(ratings);
  }

  onToiletteRatingChanged(event: any) {
    const index = event.index;
    const rating = event.rating;
    let ratings = this.secondFormGroup.get('ratings')?.value;
    //console.log(ratings);

    ratings[index].Toilette_Rating = rating;
    this.secondFormGroup.get('ratings')?.setValue(ratings);
  }
  //#endregion
}

export interface ChildJournal {
  Humeur_Rating: number;
  Toilette_Rating: number;
  Manger_Rating: number;
  Participation_Rating: number;
}
