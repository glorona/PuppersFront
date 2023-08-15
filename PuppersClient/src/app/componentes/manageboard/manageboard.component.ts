import { Component } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { MascotaData } from 'src/app/interfaces/mascota-data';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
import { Area } from 'src/app/interfaces/area';
import { Localizacion } from 'src/app/interfaces/localizacion';
@Component({
  selector: 'app-manageboard',
  templateUrl: './manageboard.component.html',
  styleUrls: ['./manageboard.component.css']
})
export class ManageboardComponent {
  selected = 'option1';
  displayedColumns!: string[];
  listamostrar: any[] = [];
  listalista!: any;
  paseadores: Paseador[] = [];
  areas: Area[] = [];
  locations: Localizacion[] = [];
  mascotas: MascotaData[] = [];
  mascotas1: Mascota[] = [];
  mascotalista!: MascotaData;
  clientes: Cliente[] = [];
  paseador = false;
  cliente = false;
  mascota = false;

  constructor(private aloc:ArealocationService,private cliService:ClienteService, mascotaService:MascotaService, paseadorService: PaseadorService ){
    cliService.getClientes().subscribe(respuesta => {
      this.clientes = respuesta as Cliente[];
    })

    mascotaService.getMascotas().subscribe(respuesta1 =>{
      this.mascotas1 = respuesta1 as Mascota[];
    })

    aloc.getAreas().subscribe(respuesta =>{
      this.areas = respuesta as Area[];
    })

    aloc.getLocations().subscribe(respuesta =>{
      this.locations = respuesta as Localizacion[];
    })

    mascotaService.getAllMascotasData().subscribe(respuesta1 =>{
      this.mascotas = respuesta1 as MascotaData[];
      this.mascotalista = this.mascotas[0];
    })

    paseadorService.getPaseadores().subscribe(respuesta2 =>{
      this.paseadores = respuesta2 as Paseador[];
      this.obtenerDatosVista();
    })


  }



  obtenerDatosVista(){
    if(this.selected == "option1"){
      this.cliente = false;
      this.paseador = true;
      this.mascota = false;
      this.listamostrar = this.paseadores;
      this.displayedColumns = ['ID', 'name', 'tel','date','actions'];
    }
    else if (this.selected == "option2"){
      this.cliente = true;
      this.paseador = false;
      this.mascota = false;
      this.listamostrar = this.clientes;
      const arr = [];
      let areaname = "";
      let locname = "";
      for(const cliente of this.listamostrar){
        for(const location of this.locations){
          if(location.location_id == cliente.location_id){
            locname = location.location_name
            for(const area of this.areas){
              if(area.area_id == location.area_id){

                areaname = area.area_name

              }
            }
          }
        }

        const dict = {"client_tel":cliente.client_tel,"client_ID":cliente.client_ID,"client_name":cliente.client_name,"start_date":cliente.start_date,"area":areaname,"location":locname}
        arr.push(dict);
      }
      this.listamostrar = arr;
      console.log(this.listamostrar);
      this.displayedColumns = ['name', 'tel', 'area','location','date','actions'];
    }
    else if (this.selected =="option3"){
      this.mascota = true;
      this.cliente = false;
      this.paseador = false;
      this.listamostrar = this.mascotas1;
      console.log(this.listamostrar)
      this.displayedColumns = [ 'name', 'breed', 'service','actions'];

    }
    else{
      this.cliente = false;
      this.paseador = false;
      this.mascota = false;

    }

  }

}
