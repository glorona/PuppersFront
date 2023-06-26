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
  areaClientes: boolean = false;
  localizacionClientes: boolean = false;
  mascotaPaseador: boolean = false;
  mascotaDueno: boolean = false;
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
      this.areaClientes = true;
      this.localizacionClientes = false;
      this.mascotaPaseador = false;
      this.mascotaDueno = false;
      this.listamostrar = this.paseadores;
      console.log("Opcion1");
      this.displayedColumns = ['ID', 'name', 'tel', 'ced','date'];
    }
    else if (this.selected == "option2"){
      this.areaClientes = false;
      this.localizacionClientes = true;
      this.mascotaPaseador = false;
      this.mascotaDueno = false;
      this.listamostrar = this.mascotas;
      console.log("Opcion2");
      this.displayedColumns = ['ID', 'name', 'raza', 'fecharenovar','servicio'];
    }
    else if (this.selected == "option3"){
      this.areaClientes = false;
      this.localizacionClientes = false;
      this.mascotaPaseador = true;
      this.mascotaDueno = false;
      this.listamostrar = this.clientes;
      console.log("Opcion 3");
      this.displayedColumns = ['ID', 'name', 'tel', 'area','date'];
    }
    else if (this.selected == "option4"){
      this.areaClientes = false;
      this.localizacionClientes = false;
      this.mascotaPaseador = true;
      this.mascotaDueno = false;
      this.listamostrar = this.clientes;
      console.log("Opcion 4");
      this.displayedColumns = ['ID', 'name', 'tel', 'area','date'];

    }
    else{
      this.areaClientes = false;
      this.localizacionClientes = false;
      this.mascotaPaseador = false;
      this.mascotaDueno = false;

    }

  }


}
