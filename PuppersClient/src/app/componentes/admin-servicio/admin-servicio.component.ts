import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Servicio } from 'src/app/interfaces/servicio';
import { Area } from 'src/app/interfaces/area';
import { Cliente } from 'src/app/interfaces/cliente';
import { Localizacion } from 'src/app/interfaces/localizacion';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { FranjaService } from 'src/app/servicios/franja.service';
import { FranjaHoraria } from 'src/app/interfaces/franja-horaria';
import { PaseoService } from 'src/app/servicios/paseo.service';
import { Paseo } from 'src/app/interfaces/paseo';
@Component({
  selector: 'app-admin-servicio',
  templateUrl: './admin-servicio.component.html',
  styleUrls: ['./admin-servicio.component.css']
})
export class AdminServicioComponent {

  id_serv!: number;
  servicioAc!: Servicio;
  servici: Servicio[] = [];
  dataready = false;
  mascota: Mascota[] = [];
  paseadores: Paseador[] = [];
  pase: Paseador[] = [];
  franj: FranjaHoraria[] = [];
  paseoslist: Paseo[] = [];
  arr: any[] = [];
  mascotaInf!: Mascota;
  paseador!: Paseador;
  fi!: FranjaHoraria;
  constructor(private ps:PaseoService,private fh:FranjaService,private route:ActivatedRoute, private serv:ServicioService, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){

  }
  

  ngOnInit(){
    const {id} = this.route.snapshot.params;
    this.id_serv = parseInt(id);
    this.serv.getServicio(this.id_serv).subscribe(respuesta2 =>{
      this.servici = respuesta2 as Servicio[];
      this.servicioAc= this.servici[0];
      this.getData()
    })
  }

  getData(){
    console.log("Data")
    this.dataready = true;

    this.mascotaService.getMascota(this.servicioAc.pet_token).subscribe(respuesta2 =>{
      this.mascota = respuesta2 as Mascota[];
      this.mascotaInf = this.mascota[0];
    })

    this.paseadorService.getPaseador(this.servicioAc.walker_ID).subscribe(respuesta2 =>{
      this.pase = respuesta2 as Paseador[];
      this.paseador = this.pase[0];
    })

    this.paseadorService.getPaseadores().subscribe(respuesta =>{
      this.paseadores = respuesta as Paseador[];
    })

    this.fh.getFranja(this.servicioAc.franja_id).subscribe(respuesta =>{
      this.franj = respuesta as FranjaHoraria[];
      this.fi = this.franj[0];
    })

    this.ps.getPaseoServicio(this.servicioAc.servicio_ID).subscribe(respuesta =>{
      this.paseoslist = respuesta as Paseo[];
      console.log(this.paseoslist);
      this.loadList();
    })




    
  }

  loadList(){
    let paseadorname = ""
    let number = 1;
    for(const paseo of this.paseoslist){
      for(const paseador of this.paseadores){
        if(paseo.walker_ID == paseador.walker_ID){
          paseadorname = paseador.walker_name;
        }

      }
      const mapa = {"no":number,"paseo_ID":paseo.paseo_ID,"walker_name":paseadorname}
      number+=1
      this.arr.push(mapa)
    }
  }

  del(){

    this.serv.deleteServicio(this.id_serv).subscribe(respuesta2 =>{
      console.log("Borrado!")
      this.router.navigate(['/manageboard'])
    })

  }

}
