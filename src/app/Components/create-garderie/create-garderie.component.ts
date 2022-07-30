import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlService } from 'src/app/shared/services/EnvironmentUrl.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/http/auth.service';

@Component({
  selector: 'app-create-garderie',
  templateUrl: './create-garderie.component.html',
  styleUrls: ['./create-garderie.component.css'],
})
export class CreateGarderieComponent implements OnInit {
  provinces = [
    'Alberta',
    'British Columbia',
    'Manibota',
    'New Brunswick',
    'Newfoundland and Labrador',
    'Northwest Territories',
    'Nova scotia',
    'Nunavut',
    'Ontario',
    'Prince Edward Island',
    'Quebec',
    'Saskatchewan',
    'Yukon',
  ];
  form = this.fb.group({
    Name: ['', Validators.required],
    Address: this.fb.group({
      Ville: ['', Validators.required],
      Rue: ['', Validators.required],
      Province: ['', Validators.required],
      CodePostal: ['', Validators.required],
      Telephone: ['', Validators.required],
    }),
  });
  constructor(
    private authService: AuthService,
    private router: Router,
    public fb: FormBuilder,
    private http: HttpClient,
    private envUrl: EnvironmentUrlService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      this.createGarderie('Garderie/Create', this.form.value).subscribe(
        (res) => {
          console.log(res),
            (this.authService.user_info.garderieId = res.data.id);
        },
        (err) => console.log(err),
        () => {
          console.log('create garderie completed');

       this.logout()
        }
      );
    }
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  createGarderie(route: string, createGarderieRequest: any) {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      createGarderieRequest
    );
  }
  private createCompleteRoute = (route: string, envAddress: string) => {
    const url = `${envAddress}/${route}`;
    return url;
  };
}
