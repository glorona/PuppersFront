import { Component, OnInit } from '@angular/core';
import { AuthyService } from 'src/app/servicios/authy.service';
import { TokenService } from 'src/app/servicios/token.service';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  selected = 'admin';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  rolesjson = this.tokenStorage.getRoles();


  constructor(private authService: AuthyService, private tokenStorage: TokenService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password,this.selected).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.saveID(password);
        this.tokenStorage.saveRoles(this.selected);
        this.rolesjson = this.tokenStorage.getRoles();
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.authService.loginSuccess(this.isLoggedIn);
        this.redirect();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  redirect(): void{
    if(this.rolesjson == 'admin'){
      this.router.navigate(['/dashboard'])
    }
    else if(this.rolesjson == 'paseador'){
      this.router.navigate(['/paseador'])
    }
    else{
      this.router.navigate(['/homecliente'])
    }

  }

  reloadPage(): void {
    window.location.reload();
    this.redirect();
  }
}