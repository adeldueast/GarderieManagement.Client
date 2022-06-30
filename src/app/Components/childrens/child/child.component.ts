import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildrenService } from 'src/app/shared/services/http/children.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalGuardianCreateComponent } from '../../modals/modal-guardian-create/modal-guardian-create.component';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit {
  child_info = {
    id: undefined,
    nom: undefined,
    image: undefined,
    birthdate: undefined,
    group: undefined,
  };

  updateForm = new FormGroup({
    nom: new FormControl(this.child_info.nom),
    birthdate: new FormControl(this.child_info.birthdate),
    group: new FormControl(this.child_info.group),
  });

  constructor(
    private childrenService: ChildrenService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.child_info.id = params['id'];
    });

    this.getChild();
    this.updateForm.disable();
  }

  getChild = () => {
    this.childrenService
      .getChild(`Enfant/Get/${this.child_info.id}`)
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.child_info.image = res.data.image;
          this.child_info.nom = res.data.nom;
          this.child_info.birthdate = res.data.dateNaissance;
          this.child_info.group = res.data.group ? res.data.group : 'No group';
          this.updateForm.setValue({
            nom: this.child_info.nom,
            birthdate: this.child_info.birthdate,
            group: this.child_info.group,
          });
        },
      });
  };

  onSubmit = () =>
    console.log(
      'Updating child with current values => ',
      this.updateForm.value
    );

  updateChild = () => {
    this.childrenService
      .updateChild('Enfant/Update', this.updateForm.value)
      .subscribe((res) => console.log(res));
  };

  toggleEdit = () =>
    this.updateForm.enabled
      ? this.updateForm.disable()
      : this.updateForm.enable();

  openDialog() {
    const dialogRef = this.dialog.open(ModalGuardianCreateComponent);
    dialogRef.beforeClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
