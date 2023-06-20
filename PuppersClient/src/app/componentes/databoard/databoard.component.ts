import { Component } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
@Component({
  selector: 'app-databoard',
  templateUrl: './databoard.component.html',
  styleUrls: ['./databoard.component.css']
})
export class DataboardComponent {
  selected = 'option0';
  displayedColumns!: string[];
  listamostrar!: any[];
  paseadores: Paseador[] = [];
  mascotas: Mascota[] = [];
  clientes: Cliente[] = [];
  paseador: boolean = false;
  cliente: boolean = false;
  mascota: boolean = false;

  constructor(private cliService:ClienteService, mascotaService:MascotaService, paseadorService: PaseadorService ){
    cliService.getClientes().subscribe(respuesta => {
      this.clientes = respuesta as Cliente[];
    })

    mascotaService.getMascotas().subscribe(respuesta1 =>{
      this.mascotas = respuesta1 as Mascota[];
    })

    paseadorService.getPaseadores().subscribe(respuesta2 =>{
      this.paseadores = respuesta2 as Paseador[];
    })




  }

  obtenerDatosVista(){
    if(this.selected == "option1"){
      this.cliente = false;
      this.paseador = true;
      this.mascota = false;
      this.listamostrar = this.paseadores;
      console.log("Opcion1");
      this.displayedColumns = ['ID', 'name', 'tel', 'ced','date'];
    }
    else if (this.selected == "option2"){
      this.mascota = true;
      this.paseador = false;
      this.listamostrar = this.mascotas;
      console.log("Opcion2");
      this.displayedColumns = ['ID', 'name', 'raza', 'fecharenovar','servicio'];
    }
    else if (this.selected == "option3"){
      this.cliente = true;
      this.paseador = false;
      this.mascota = false;
      this.listamostrar = this.clientes;
      console.log("Opcion 3");
      this.displayedColumns = ['ID', 'name', 'tel', 'area','date'];
    }
    else{
      this.cliente = false;
      this.paseador = false;
      this.mascota = false;

    }

  }


}
