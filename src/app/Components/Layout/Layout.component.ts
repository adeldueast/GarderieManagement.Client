import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/http/auth.service';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})

export class LayoutComponent implements OnInit {


  constructor(private authService : AuthService) {}
   

  
  ngOnInit(): void {
 
  }


}
