import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-Sidebar-Item',
  templateUrl: './Sidebar-Item.component.html',
  styleUrls: ['./Sidebar-Item.component.css'],
})
export class SidebarItemComponent implements OnInit {
  @Input() title?: string;

 

  constructor() {}

  ngOnInit() {}
}
