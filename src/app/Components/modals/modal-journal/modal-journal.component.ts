import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JournalService } from 'src/app/shared/services/http/journal.service';
import { ModalGroupedChildrenComponent } from '../modal-grouped-children/modal-grouped-children.component';
import { StarRatingColor } from '../star-rating/star-rating.component';
import { ModalGroupCreateComponent } from './../modal-group-create/modal-group-create.component';

@Component({
  selector: 'app-modal-journal',
  templateUrl: './modal-journal.component.html',
  styleUrls: ['./modal-journal.component.css'],
})
export class ModalJournalComponent implements OnInit {
  isCreate = true;

  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  childName?: undefined;
  form: FormGroup = new FormGroup({
    humeur_rating: new FormControl(''),
    manger_rating: new FormControl(''),
    participation_rating: new FormControl(''),
    toilette_rating: new FormControl(''),

    activite_message: new FormControl(''),
    manger_message: new FormControl(''),
    commentaire_message: new FormControl(''),
  });
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(
    private dialog: MatDialog,
    private journalService: JournalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() { console.clear()
   // console.log(this.data, 'xoxoxoxoxox');

    //if undefined, the journal was called from modal-action-component to get todays journal for children X
    if (this.data.dataId === undefined) {
     // console.log('dataId doesnt exist');
      this.getChildsTodayJournal();
      return;
    }
    //else it was called from notification
   // console.log('dataId  exist!!');
    this.form.disable();
    this.getJournalById();
  }

  onHumeurRatingChanged(event: any) {
    this.form.patchValue({
      humeur_rating: event.rating,
    });
  }
  onMangerRatingChanged(event: any) {
    this.form.patchValue({
      manger_rating: event.rating,
    });
  }

  onParticipationRatingChanged(event: any) {
    this.form.patchValue({
      participation_rating: event.rating,
    });
  }

  onToiletteRatingChanged(event: any) {
    this.form.patchValue({
      toilette_rating: event.rating,
    });
  }

  getJournalById() {
    this.journalService
      .getJournalById(`Journal/GetById/${this.data.dataId}`)
      .subscribe((res) => {
    

        this.childName = res.data.enfantName;
        if (res.data != null) {
          this.isCreate = false;
          this.form.patchValue({
            humeur_rating: res.data.humeur_Rating,
            manger_rating: res.data.manger_Rating,
            participation_rating: res.data.participation_Rating,
            toilette_rating: res.data.toilette_Rating,

            activite_message: res.data.activite_Message,
            manger_message: res.data.manger_Message,
            commentaire_message: res.data.commentaire_Message,
          });
        }
      });
  }

  getChildsTodayJournal() {
    this.journalService
      .getChildsTodayJournal(`Journal/Get/${this.data.id}`)
      .subscribe((res) => {
       // console.log(res);

        if (res.data != null) {
          this.isCreate = false;
          this.form.patchValue({
            humeur_rating: res.data.humeur_Rating,
            manger_rating: res.data.manger_Rating,
            participation_rating: res.data.participation_Rating,
            toilette_rating: res.data.toilette_Rating,

            activite_message: res.data.activite_Message,
            manger_message: res.data.manger_Message,
            commentaire_message: res.data.commentaire_Message,
          });
        }
      });
  }

  onSubmit() {
    if (!(this.data.dataId === undefined)) {
      return;
    }
   // console.log(this.form.value);

    if (this.isCreate) {
      //console.log('creating journal');

      this.journalService
        .createChildJournal(`Journal/Create/${this.data.id}`, this.form.value)
        .subscribe((res) => {
          //console.log(res)
        });
      return;
    }

   //
    console.log('updating journal');

    this.journalService
      .updateChildJournal(`Journal/Update/${this.data.id}`, this.form.value)
      .subscribe((res) =>{
        //console.log(res)
      });
  }

  JournalGroupedClick() {
    this.dialog.open(ModalGroupedChildrenComponent);
  }
}
