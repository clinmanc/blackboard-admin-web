import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild,
  CanLoad, Route
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    let url = `/${route.path}`;

    return this.checkLogin(url);
  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    throw this.canActivate(childRoute, state);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login pages with extras
    this.router.navigate(['/login']);
    return false;
  }
}
