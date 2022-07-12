import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/http/auth.service';



@Component({
  selector: 'app-Sidebar',
  templateUrl: './Sidebar.component.html',
  styleUrls: ['./Sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  
  ngOnInit() {}

  logout() {
    //Gets rid of the token in the local storage
    //this.authService.logout();
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
}
