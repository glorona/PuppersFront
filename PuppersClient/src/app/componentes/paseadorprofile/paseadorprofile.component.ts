import { Component } from '@angular/core';
import { Paseador } from 'src/app/interfaces/paseador';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-paseadorprofile',
  templateUrl: './paseadorprofile.component.html',
  styleUrls: ['./paseadorprofile.component.css']
})
export class PaseadorprofileComponent {
  paseador : Paseador[]=[]
  ide=''
  idepaseador=''
  mascota:Mascota[]=[]
  constructor( private route: ActivatedRoute, private router: Router, private tokenSvc: TokenService, private paseadorSvc:PaseadorService, private mascotasSvc: MascotaService){
    const {id} = this.route.snapshot.params;

    this.ide=tokenSvc.getId();
   

    paseadorSvc.getPaseador(id).subscribe(res =>{
      this.paseador = res as Paseador[];
      
      
    });

    mascotasSvc.getMascotabyClient(this.ide).subscribe(res=>{
        this.mascota= res as Mascota[];
    });
  }
}
