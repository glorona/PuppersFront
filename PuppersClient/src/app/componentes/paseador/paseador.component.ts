import { Component } from '@angular/core';

import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../servicios/mascota.service';
@Component({
  selector: 'app-paseador',
  templateUrl: './paseador.component.html',
  styleUrls: ['./paseador.component.css']
})
export class PaseadorComponent {
  selected='';
  mascotas:Mascota[]=[];

  constructor(private mascotaService: MascotaService){
   mascotaService.getMascotas().subscribe(respuesta => {
    this.mascotas = respuesta as Array<Mascota>;
    console.log(this.mascotas);
    })
  }
}
