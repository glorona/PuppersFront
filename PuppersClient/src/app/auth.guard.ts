import { Injectable } from '@angular/core';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { AuthyService } from './servicios/authy.service';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _authService: AuthyService, private _router: Router) {}

  public canActivate(): Observable<boolean | UrlTree> {
    return this._authService.isAuthenticated$
      .pipe(
        map((s: boolean) => s ? true: this._router.parseUrl('/login'))
      );
  }
}
