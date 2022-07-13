import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService as AuthService } from '../services/http/auth.service';

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
      //If Authenticated , authorize
      return true;
    }

    //If NOT Authenticated , redirect to /login
    // console.log('state.url =>', state.url);

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
