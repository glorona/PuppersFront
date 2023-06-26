import { Component } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { MascotaData } from 'src/app/interfaces/mascota-data';
@Component({
  selector: 'app-databoard',
  templateUrl: './databoard.component.html',
  styleUrls: ['./databoard.component.css']
})
export class DataboardComponent {
  selected = 'option0';
  selectedArea = 'default';
  selectedPaseador = '000000';
  selectedLocation = 'default';
  displayedColumns!: string[];
  listamostrar!: any[];
  paseadores: Paseador[] = [];
  mascotas: Mascota[] = [];
  clientes: Cliente[] = [];
  clientesQuery: any[] = [];
  mascotasData: MascotaData[] = [];
  mascotaLista!: any;
  clientesQueryLista!: any;
  paseadoresQuery: any[] = [];
  paseadoresQueryLista!: any;
  localizaciones: string[] = [];
  areas: string[] = []
  areaClientes: boolean = false;
  localizacionClientes: boolean = false;
  mascotaPaseador: boolean = false;
  mascotaDueno: boolean = false;
  queryReady: boolean = false;
  constructor(private cliService:ClienteService, private mascotaService:MascotaService, private paseadorService: PaseadorService ){
    
    cliService.getClientes().subscribe(respuesta => {
      this.clientes = respuesta as Cliente[];
      for(var cliente of this.clientes){
        if(!(this.areas.includes(cliente.area))){
          this.areas.push(cliente.area)

        }
        if(!(this.localizaciones.includes(cliente.location))){
          this.localizaciones.push(cliente.location);

        }
      }
    })

    mascotaService.getMascotas().subscribe(respuesta =>{
      this.mascotas = respuesta as Mascota[];
    })

    paseadorService.getPaseadores().subscribe(respuesta =>{
      this.paseadores = respuesta as Paseador[];
    })




  }


  queryArea(area: string){
    console.log(area);
    this.cliService.getClientesAreaSpec(area).subscribe(respuesta =>{
      this.clientes = respuesta as any[];
      this.clientesQueryLista = this.clientes[0];
      console.log(this.clientesQueryLista)
      this.displayedColumns = ['area','petname','breed','name','location','service']
      this.queryReady = true;
      console.log("Query ready")
    })



  }

  queryLocation(loc:string){
    this.cliService.getClientesLocation(loc).subscribe(respuesta =>{
      this.clientes = respuesta as any[];
      this.clientesQueryLista = this.clientes[0];
      console.log(this.clientesQueryLista)
      this.displayedColumns = ['area','petname','breed','name','location','service']
      this.queryReady = true;
      console.log("Query ready")
    })
    
  }

  queryPaseadores(id:string){
    this.paseadorService.getMascotasPaseador(id).subscribe(respuesta =>{
      this.paseadoresQuery = respuesta as any[];
      this.paseadoresQueryLista = this.paseadoresQuery[0];
      console.log(this.paseadoresQueryLista)
      this.displayedColumns = ['name','petname','breed','location','area','service']
      this.queryReady = true;
      console.log("Query ready")

      
    })
    
  }

  queryMascotasDuenos(){
    //this.obtenerDatosVista();
    this.mascotaService.getAllMascotasData().subscribe(respuesta =>{
      this.mascotasData = respuesta as MascotaData[];
      this.mascotaLista = this.mascotasData[0];
      console.log(this.mascotaLista);
      this.displayedColumns = ['petname','breed','client','walker','area','location','service']
      this.queryReady = true;
      console.log("Query ready");

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
    }
    else if (this.selected == "option2"){
      this.areaClientes = false;
      this.localizacionClientes = true;
      this.mascotaPaseador = false;
      this.mascotaDueno = false;
      this.listamostrar = this.mascotas;
      console.log("Opcion2");
    }
    else if (this.selected == "option3"){
      this.areaClientes = false;
      this.localizacionClientes = false;
      this.mascotaPaseador = true;
      this.mascotaDueno = false;
      this.listamostrar = this.clientes;
      console.log("Opcion 3");
    }
    else if (this.selected == "option4"){
      this.areaClientes = false;
      this.localizacionClientes = false;
      this.mascotaPaseador = false;
      this.mascotaDueno = true;
      this.listamostrar = this.clientes;
      console.log("Opcion 4");
      this.queryMascotasDuenos();

    }
    else{
      this.areaClientes = false;
      this.localizacionClientes = false;
      this.mascotaPaseador = false;
      this.mascotaDueno = false;

    }

  }


}
