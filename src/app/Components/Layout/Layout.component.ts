import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/http/Auth.service';



@Component({
  selector: 'app-Layout',
  templateUrl: './Layout.component.html',
  styleUrls: ['./Layout.component.css'],
})

export class LayoutComponent implements OnInit {


  constructor(private AuthService : AuthService) {}

  ngOnInit(): void {
 
  }


}
