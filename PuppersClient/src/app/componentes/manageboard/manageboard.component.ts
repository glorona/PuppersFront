import { Component } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { MascotaData } from 'src/app/interfaces/mascota-data';
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
  mascotas: MascotaData[] = [];
  mascotas1: Mascota[] = [];
  mascotalista!: MascotaData;
  clientes: Cliente[] = [];
  paseador = false;
  cliente = false;
  mascota = false;

  constructor(private cliService:ClienteService, mascotaService:MascotaService, paseadorService: PaseadorService ){
    cliService.getClientes().subscribe(respuesta => {
      this.clientes = respuesta as Cliente[];
    })

    mascotaService.getMascotas().subscribe(respuesta1 =>{
      this.mascotas1 = respuesta1 as Mascota[];
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
