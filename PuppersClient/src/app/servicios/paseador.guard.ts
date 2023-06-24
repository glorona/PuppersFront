import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from "@angular/router";
import { AuthyService } from "./authy.service";
import { TokenService } from "./token.service";
@Injectable({
  providedIn: 'root'
})
export class PaseadorGuard implements CanActivate {
  constructor(
		private authService: AuthyService, private tokSer: TokenService,
		private router: Router) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | Promise<boolean> {
    var isAuthenticated = false;
    if (this.tokSer.getToken()) {
      isAuthenticated = true;
    }
    var roles = this.tokSer.getRoles();
    var hasAccess = false;
		if (!isAuthenticated) {
			this.router.navigate(['/login']);
		}

    if(roles == "cliente"){
      this.router.navigate(['/homecliente'])
    }
    else if (roles == "admin"){
      this.router.navigate(['/dashboard'])
    }
    else{
      if(isAuthenticated && roles == 'paseador'){
        hasAccess = true;
      }
    }

		return isAuthenticated && hasAccess;
	}
  
  
}
