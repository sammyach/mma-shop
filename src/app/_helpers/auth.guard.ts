import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private  authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.loggedIn()){
        console.log(this.authService.getLoggedInRole());

        // check if route is restricted by role
        if (route.data.roles && route.data.roles.indexOf(this.authService.getLoggedInRole()) === -1) {
          // role not authorised so redirect to home page
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }

      // send to login page
      this.router.navigate(['login']);
      return false;
  }

}
