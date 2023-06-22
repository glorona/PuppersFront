import { Component , OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthyService } from 'src/app/servicios/authy.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public isAuthenticated = false;
  private _destroySub$ = new Subject<void>();
  constructor(private _authService: AuthyService) { }

  public ngOnInit(): void {
    this._authService.isAuthenticated$.pipe(
      takeUntil(this._destroySub$)
    ).subscribe((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated);
  }

  public ngOnDestroy(): void {
    this._destroySub$.next();
  }

  public logout(): void {
    this._authService.logout('/').pipe(take(1));
  }

}
