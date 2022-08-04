import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/http/auth.service';



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('authGard ctor');

    const isUserAuthenticated = this.authService.isUserAuthenticated();
    if (isUserAuthenticated) {
     

      if (state.url == '/garderie') {
        if (!this.authService.userHasGarderie()) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      } else {
        if (this.authService.userHasGarderie()) {
          if (state.url == '/') {

            this.router.navigate(['/children'])
          }
          return true;
        }

        this.router.navigate(['/garderie']);
        return false;
      }

      //If Authenticated , authorize
      return true;
    }

    //If NOT Authenticated , redirect to /login
    // console.log('state.url =>', state.url);

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
