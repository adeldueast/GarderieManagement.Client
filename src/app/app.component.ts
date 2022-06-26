import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Garderie.Client';

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
  
  }
}
