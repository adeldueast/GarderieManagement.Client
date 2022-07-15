import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Subject } from 'rxjs';
import { EnvironmentUrlService } from '../EnvironmentUrl.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  public user_info: any = {
    uid: undefined,
    email: undefined,
    first_name: undefined,
    last_name: undefined,
    roles: [],
  };
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService,
    private jwtHelper: JwtHelperService
  ) {
    //console.log('😡😡😡 Auth.service constructor 😡😡😡');
  }

  public registerUser = (route: string, register_request: any) => {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      register_request
    );
  };

  public loginUser = (route: string, login_request: any) => {
    return this.http.post<any>(
      this.createCompleteRoute(route, this.envUrl.urlAddress),
      login_request
    );
  };

  public logout = () => {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
    this.UpdateCurrentUserInfo(null);
  };

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  };

  private UpdateCurrentUserInfo(token: string | null) {
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token!);
      // console.log(decodedToken);

      this.user_info.uid = decodedToken.Id;
      this.user_info.email = decodedToken.email;
      this.user_info.first_name = decodedToken.firstname;
      this.user_info.last_name = decodedToken.lastname;
      this.user_info.roles = decodedToken.role;
    } else {
      this.user_info.uid = undefined;
      this.user_info.email = undefined;
      this.user_info.first_name = undefined;
      this.user_info.last_name = undefined;
      this.user_info.roles = [];
    }
    // console.log('UpdatingCurrentUserInfo().. ', this.user_info);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token!)) {
      //this.sendAuthStateChangeNotification(true);
      this.UpdateCurrentUserInfo(token);
      return true;
    }

    this.logout();
    return false;
  };

  public isUserInRole = (role: string): any => {
    return this.user_info.roles.includes(role);
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    const url = `${envAddress}/${route}`;
    return url;
  };
}
