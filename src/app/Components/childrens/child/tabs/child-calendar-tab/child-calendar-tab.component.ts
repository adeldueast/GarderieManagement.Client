import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalGuardianCreateComponent } from 'src/app/Components/modals/modal-guardian-create/modal-guardian-create.component';

@Component({
  selector: 'app-child-calendar-tab',
  templateUrl: './child-calendar-tab.component.html',
  styleUrls: ['./child-calendar-tab.component.css'],
})
export class ChildCalendarTabComponent implements OnInit {
  constructor() {
    
  }

  ngOnInit() {}
}
