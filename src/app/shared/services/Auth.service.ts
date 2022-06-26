import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) {}

  login(login_request: any) {
    return this.http
      .post<any>('https://localhost:44356/api/v1/Account/Login', login_request)
      .pipe(tap((res) => this.setSession(res)));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  registerOwner(register_request: any) {


    return this.http.post(
      'https://localhost:44356/api/v1/Account/register',
      register_request
    );
  }

  //#region  Auth helper methods

  getTokenClaims() {
    let token = localStorage.getItem('id_token');
    if (token) {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      console.log('Uid : ' + decodedJWT.Id);
      console.log('First name : ' + decodedJWT.firstname);
      console.log('Last name : ' + decodedJWT.lastname);
      
      console.log('Email : ' + decodedJWT.email);
      console.log('Role : ' + decodedJWT.role);
      
      
    }
  }

  clearToken() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  private setSession(authResult: any) {
    const expiresIn = authResult.data.expiresIn;

    const expiresAt = moment().add(expiresIn, 'minutes');

    localStorage.setItem('id_token', authResult.data.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  isLoggedIn() {
    //todo, this will change eventually.
    if (moment().isBefore(this.getExpiration())) {
      //token has not expired
      return true;
    }
    //token has expired,
    this.clearToken();
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  //#endregion
}
