import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticate();
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticate()
      .pipe(take(1));
  }

}
