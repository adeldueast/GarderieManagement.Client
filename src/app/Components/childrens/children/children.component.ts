import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig } from './../../modal/modal';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css'],
})
export class ChildrenComponent implements OnInit {

  @ViewChild('modal') private modalComponent?: ModalComponent;

  @Input() modalConfig: ModalConfig = {
    modalTitle: 'Create child',
  };

  constructor() {}

  ngOnInit() {}

  async openModal() {
    return await this.modalComponent?.open();
  }

}
