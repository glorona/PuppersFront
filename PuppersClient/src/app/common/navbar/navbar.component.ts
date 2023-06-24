import { Component , OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthyService } from 'src/app/servicios/authy.service';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private tokSer:TokenService){

  }

  logout(): void {
    this.tokSer.signOut();
    window.location.reload();
  }


}
