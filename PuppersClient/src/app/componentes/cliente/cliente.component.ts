import { Component } from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
 mascota !: Mascota;
cliente !: Cliente;

 constructor( private route: ActivatedRoute, private peliculasSvc:MascotaService, private clienteSvc: ClienteService,private router: Router) { 

  const {id} = this.route.snapshot.params;
  
  
    this.peliculasSvc.getMascota(id).subscribe(peli=>{
      
      this.mascota = peli as Mascota;
      console.log(this.mascota)

      
       });
/*
       this.clienteSvc.getCliente(this.mascota.client_tel).subscribe(cl =>{
        this.cliente= cl as Cliente;
        console.log(this.cliente);
      });
      
*/


}

  



}
