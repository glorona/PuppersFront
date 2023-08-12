import { Component } from '@angular/core';

import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../servicios/mascota.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Paseador } from 'src/app/interfaces/paseador';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
import { Localizacion } from 'src/app/interfaces/localizacion';
import { Area } from 'src/app/interfaces/area';
@Component({
  selector: 'app-paseador',
  templateUrl: './paseador.component.html',
  styleUrls: ['./paseador.component.css']
})
export class PaseadorComponent {
  
  mascotas:Mascota[]=[];
  selected=0;
  paseador: Paseador[]=[];
  ide =''
  idepaseador=''
  mascota : Mascota[]=[]
  cliente : Cliente[]=[]
  location : Localizacion[]=[]
  cedula = ''
  area : Area[]=[]
  constructor(private mascotaService: MascotaService,private tokenSvc: TokenService,private paseadorSvc: PaseadorService, private clienteSvc : ClienteService,private locationSvc : ArealocationService){
    this.ide= tokenSvc.getId();
   mascotaService.getMascotabyWalker(this.ide).subscribe(respuesta => {
    this.mascotas = respuesta as Array<Mascota>;
    console.log(this.mascotas);
    });


    


    paseadorSvc.getPaseador(this.ide).subscribe(res =>{
      this.paseador = res as Paseador[];
    });

    
    
  }


  obtenerDatosVista(){
      console.log(this.selected);
      this.mascotaService.getMascota(this.selected).subscribe(res =>{
          this.mascota = res as Mascota[];
          console.log("mascota")
      console.log(this.mascota)
      
      this.cedula = (this.mascota[0].client_ID);

      this.clienteSvc.getCliente(this.cedula).subscribe(r=>{
        this.cliente= r as Cliente[];
        console.log(this.cliente)
        
        this.locationSvc.getLocation(this.cliente[0].location_id).subscribe(l=>{
          this.location= l as Localizacion[];
          this.locationSvc.getArea(this.location[0].area_id).subscribe(a=>{
            this.area = a as Area[];
          });
        });

      });


      });
      
      
      

    }




}
