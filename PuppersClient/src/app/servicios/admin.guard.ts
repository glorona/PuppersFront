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
export class AdminGuard implements CanActivate {
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
    var hasAccess = false;
    var roles = this.tokSer.getRoles();
		if (!isAuthenticated) {
			this.router.navigate(['/login']);
		}

    if(roles == "cliente"){
      this.router.navigate(['/homecliente'])
    }
    else if (roles == "paseador"){
      this.router.navigate(['/paseador'])
    }
    else{
      if(isAuthenticated && roles == 'admin'){
        hasAccess = true;
      }
    }

    console.log(roles)
    console.log(isAuthenticated)
    console.log(hasAccess)

		return isAuthenticated && hasAccess;
	}
  
}
