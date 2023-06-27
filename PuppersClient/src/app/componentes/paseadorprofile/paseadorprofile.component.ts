import { Component } from '@angular/core';
import { Paseador } from 'src/app/interfaces/paseador';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/servicios/cliente.service';

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
  cliente: Cliente[]=[]
  constructor( private route: ActivatedRoute, private router: Router, private tokenSvc: TokenService, private paseadorSvc:PaseadorService, private mascotasSvc: MascotaService,private clienteSvc:ClienteService){
    const {id,pet} = this.route.snapshot.params;
    console.log(id)
    this.ide=tokenSvc.getId();
   

    paseadorSvc.getPaseador(id).subscribe(res =>{
      this.paseador = res as Paseador[];
      
      
    });

    mascotasSvc.getMascota(pet).subscribe(res=>{
        this.mascota= res as Mascota[];
    });
    clienteSvc.getCliente(this.ide).subscribe(res=>{
      this.cliente= res as Cliente[];
    });


  }
}
