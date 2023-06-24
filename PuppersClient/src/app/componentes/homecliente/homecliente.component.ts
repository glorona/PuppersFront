import { Component } from '@angular/core';

import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../servicios/mascota.service';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
  selector: 'app-homecliente',
  templateUrl: './homecliente.component.html',
  styleUrls: ['./homecliente.component.css']
})
export class HomeclienteComponent {
  
  selected='';
  mascotas:Mascota[]=[];
  ide = '';

  constructor(private mascotaService: MascotaService, private tokenSvc: TokenService){
   mascotaService.getMascotas().subscribe(respuesta => {
    this.mascotas = respuesta as Array<Mascota>;
    console.log(this.mascotas);
    });

    this.ide=this.tokenSvc.getId();
console.log(this.ide);
  }
}
