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
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PaseoService } from 'src/app/servicios/paseo.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Servicio } from 'src/app/interfaces/servicio';
import { Paseo } from 'src/app/interfaces/paseo';
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
  location2=''
  cedula = ''
  area : Area[]=[]
  mascotabreed=''
  areaname='';
  mostrar=false;
  photopaseo=''
  servicio :Servicio[]=[] 
  paseo : Paseo[]=[]
  constructor(private fireStorage:AngularFireStorage,paseoSvc : PaseoService,private mascotaService: MascotaService,private tokenSvc: TokenService,private paseadorSvc: PaseadorService, private clienteSvc : ClienteService,private locationSvc : ArealocationService,private servicioSvc:ServicioService){
    this.ide= tokenSvc.getId();
   mascotaService.getMascotabyWalker(this.ide).subscribe(respuesta => {
    this.mascotas = respuesta as Array<Mascota>;
    
    });


    


    paseadorSvc.getPaseador(this.ide).subscribe(res =>{
      this.paseador = res as Paseador[];
    });

    
    
    
  }


  obtenerDatosVista(){
      console.log(this.selected);
      this.mascotaService.getMascota(this.selected).subscribe(res =>{
      this.mascota = res as Mascota[];
      this.mascotabreed= this.mascota[0].pet_breed;
      console.log("mascota")
      console.log(this.mascota)
      
      this.cedula = (this.mascota[0].client_ID);

      this.clienteSvc.getCliente(this.cedula).subscribe(r=>{
        this.cliente= r as Cliente[];
        console.log(this.cliente)
        
        this.locationSvc.getLocation(this.cliente[0].location_id).subscribe(l=>{
          this.location= l as Localizacion[];
          this.location2=this.location[0].location_name;
          this.locationSvc.getArea(this.location[0].area_id).subscribe(a=>{
            this.area = a as Area[];
            this.areaname= this.area[0].area_name
          });
        });

      });


      });
      
      
      

    }

onSubmitInicio(){
  this.mostrar=true;
  this.servicioSvc.getServiciosPaseadorMascota(this.mascota[0].pet_token,this.paseador[0].walker_ID).subscribe(ser=>{
    this.servicio=ser as Servicio[];
    console.log(this.servicio);
  });
}
async onFileChange(event:any){
  const file = event.target.files[0]
  if(file){
    const path = `puppers/${file.name}`
    const uploadTask =await this.fireStorage.upload(path,file)
    this.photopaseo = await uploadTask.ref.getDownloadURL()
    console.log(this.photopaseo)
  }
}


}
