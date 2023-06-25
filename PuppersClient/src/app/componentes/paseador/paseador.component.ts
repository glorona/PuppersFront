import { Component } from '@angular/core';

import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../servicios/mascota.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Paseador } from 'src/app/interfaces/paseador';
import { PaseadorService } from 'src/app/servicios/paseador.service';
@Component({
  selector: 'app-paseador',
  templateUrl: './paseador.component.html',
  styleUrls: ['./paseador.component.css']
})
export class PaseadorComponent {
  selected='';
  mascotas:Mascota[]=[];
  paseador: Paseador[]=[];
  ide =''
  idepaseador=''
  
  constructor(private mascotaService: MascotaService,private tokenSvc: TokenService,private paseadorSvc: PaseadorService){
    this.ide= tokenSvc.getId();
   mascotaService.getMascotabyWalker(this.ide).subscribe(respuesta => {
    this.mascotas = respuesta as Array<Mascota>;
    console.log(this.mascotas);
    });


    


    paseadorSvc.getPaseador(this.ide).subscribe(res =>{
      this.paseador = res as Paseador[];
    });

    
    
  }




}
