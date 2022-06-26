import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth2Service } from 'src/app/shared/services/Auth2.service';



@Component({
  selector: 'app-Layout',
  templateUrl: './Layout.component.html',
  styleUrls: ['./Layout.component.css'],
})

export class LayoutComponent implements OnInit {


  constructor(private authService2 : Auth2Service) {}

  ngOnInit(): void {
    this.authService2.isUserInRole('caca');
  }


}
