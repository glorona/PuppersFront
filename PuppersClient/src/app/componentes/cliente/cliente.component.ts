import { Component } from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
 mascota : Mascota[]=[];
ide !: any;
cliente : Cliente[]=[];
walker ='';
 constructor( private route: ActivatedRoute, private mascotasSvc:MascotaService, private tokenSvc: TokenService,private clienteSvc: ClienteService,private router: Router) { 

  const {id} = this.route.snapshot.params;
  
  
    this.mascotasSvc.getMascota(id).subscribe(peli=>{
      
      this.mascota = peli as Mascota[];
      console.log(this.mascota)

      this.walker=(this.mascota[0].walker_ID);
       });
/*
       this.clienteSvc.getCliente(this.mascota.client_tel).subscribe(cl =>{
        this.cliente= cl as Cliente;
        console.log(this.cliente);
      });
      
*/
this.ide=this.tokenSvc.getId();
console.log(this.ide);
this.clienteSvc.getCliente(this.ide).subscribe(cl =>{
  this.cliente= cl as Cliente[];
  console.log(this.cliente);
});



}

  



}
