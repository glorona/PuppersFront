import { Component } from '@angular/core';

import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../servicios/mascota.service';
@Component({
  selector: 'app-homecliente',
  templateUrl: './homecliente.component.html',
  styleUrls: ['./homecliente.component.css']
})
export class HomeclienteComponent {
  
  selected='';
  mascotas:Mascota[]=[];

  constructor(private mascotaService: MascotaService){
   mascotaService.getMascotas().subscribe(respuesta => {
    this.mascotas = respuesta as Array<Mascota>;
    console.log(this.mascotas);
    })
  }
}
