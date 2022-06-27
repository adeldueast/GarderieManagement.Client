import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { EnvironmentUrlService } from '../EnvironmentUrl.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();

  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService,
    private jwtHelper: JwtHelperService
  ) {}

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
  };


  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  };


  public isUserAuthenticated = (): boolean => {
  
    
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token!)) {
     
      return true;
    }
  

    return false;
  };

  public isUserInRole = (role: string): boolean => {
    const token = localStorage.getItem('token') || undefined;
    const decodedToken = this.jwtHelper.decodeToken(token);

    const roles = decodedToken.role;

    console.log('decoded token', decodedToken);

    return roles.includes(role);
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    const url = `${envAddress}/${route}`;
    return url;
  };
}
