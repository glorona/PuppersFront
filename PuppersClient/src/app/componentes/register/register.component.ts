import { Component } from '@angular/core';
import { AuthyService } from 'src/app/servicios/authy.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    username: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthyService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, password} = this.form;

    
  }

}
