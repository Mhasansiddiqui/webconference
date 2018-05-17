import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationServiceService} from '../_services/authentication-service.service'
@Injectable()
export class AuthGuardService implements CanActivate {
 
  constructor( private auth : AuthenticationServiceService , private router: Router) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if (this.auth.getStoreCookie()) {
         
          // logged in so return true
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}