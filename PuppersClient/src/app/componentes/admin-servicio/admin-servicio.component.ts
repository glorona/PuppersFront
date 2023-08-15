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
  constructor(private route:ActivatedRoute, private serv:ServicioService, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){

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

    
  }

  del(){

    this.serv.deleteServicio(this.id_serv).subscribe(respuesta2 =>{
      console.log("Borrado!")
      this.router.navigate(['/manageboard'])
    })

  }

}
