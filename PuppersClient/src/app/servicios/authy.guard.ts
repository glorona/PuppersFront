import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthyService } from "./authy.service";
@Injectable({
  providedIn: 'root'
})
export class AuthyGuard  {
  constructor(
		private authService: AuthyService,
		private router: Router) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | Promise<boolean> {
		var isAuthenticated = this.authService.getAuthStatus();
		if (!isAuthenticated) {
			this.router.navigate(['/login']);
		}

		return isAuthenticated;
	}
  
}

