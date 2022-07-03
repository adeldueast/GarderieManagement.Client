import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChildrenService } from 'src/app/shared/services/http/children.service';

@Component({
  selector: 'app-child-information-tab',
  templateUrl: './child-information-tab.component.html',
  styleUrls: ['./child-information-tab.component.css'],
})
export class ChildInformationTabComponent implements OnInit {

  @Input() child_info!: any;
  updateForm!: FormGroup;

  constructor(private childrenService: ChildrenService) {}

  ngOnInit() {
  
    this.updateForm = new FormGroup({
      nom: new FormControl(this.child_info.nom),
      birthdate: new FormControl(this.child_info.birthdate),
      group: new FormControl(this.child_info.group),
    });

 

    this.updateForm.disable();
  }

  onSubmit = () =>
    console.log(
      'Updating child with current values => ',
      this.updateForm.value
    );

  toggleEdit = () =>
    this.updateForm.enabled
      ? this.updateForm.disable()
      : this.updateForm.enable();

  updateChild = () => {
    this.childrenService
      .updateChild('Enfant/Update', this.updateForm.value)
      .subscribe((res) => console.log(res));
  };
}
