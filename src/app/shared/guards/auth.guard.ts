import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService as AuthService } from '../services/Auth.service';

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


    console.log('GUARD ❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥 GUARD');
    //If Authenticated , authorize
    if (this.authService.isUserAuthenticated()) {
      console.log('😁 you can go !');
      return true;
    }

     //If NOT Authenticated , redirect to /login
    console.log('😡 oops NO !');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
