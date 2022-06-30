import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-child-create',
  templateUrl: './modal-child-create.component.html',
  styleUrls: ['./modal-child-create.component.css'],
})
export class ModalChildCreateComponent {
  public form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    dateOfBirth: new FormControl(''),
  });
  constructor() {}

 
}
