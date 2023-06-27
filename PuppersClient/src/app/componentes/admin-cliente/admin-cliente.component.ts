import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';

@Component({
  selector: 'app-admin-cliente',
  templateUrl: './admin-cliente.component.html',
  styleUrls: ['./admin-cliente.component.css']
})
export class AdminClienteComponent {
  mascotasAsignadas: Mascota[] = [];
  cliente: Cliente[] = [];
  clienteInfo!: Cliente;
  id_s!: string;
  constructor(private route:ActivatedRoute, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){

  }

  ngOnInit(){

    const {id} = this.route.snapshot.params;
    this.id_s = id;
    this.clienteService.getCliente(id).subscribe(respuesta2 =>{
      this.cliente = respuesta2 as Cliente[];
      this.clienteInfo = this.cliente[0];
    })

    this.mascotaService.getMascotabyClient(id).subscribe(respuesta =>{
      this.mascotasAsignadas = respuesta as Mascota[];
      console.log(this.mascotasAsignadas)
    })

  }

  del(){

    this.clienteService.deleteCliente(this.id_s).subscribe(respuesta2 =>{
      console.log("Borrado!")
      this.router.navigate(['/manageboard'])
    })

  }

}
