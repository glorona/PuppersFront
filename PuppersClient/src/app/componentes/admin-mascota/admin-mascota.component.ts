import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';

@Component({
  selector: 'app-admin-mascota',
  templateUrl: './admin-mascota.component.html',
  styleUrls: ['./admin-mascota.component.css']
})
export class AdminMascotaComponent {
  mascotasAsignadas: Mascota[] = [];
  mascota: Mascota[] = [];
  dueno: Cliente[] = [];
  paseador: Paseador[] = [];
  id_s!: string;
  duenoInfo!: Cliente;
  paseadorInfo!: Paseador;
  mascotaInfo!: Mascota;

  constructor(private route:ActivatedRoute, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){

  }

  ngOnInit(){

    const {id} = this.route.snapshot.params;
    this.id_s = id;
    this.mascotaService.getMascota(id).subscribe(respuesta2 =>{
      this.mascota = respuesta2 as Mascota[];
      this.mascotaInfo = this.mascota[0];
      this.getData();
    })

  }

  getData(){
    this.clienteService.getCliente(this.mascotaInfo.client_tel).subscribe(respuesta =>{
      this.dueno = respuesta as Cliente[];
      this.duenoInfo = this.dueno[0];
      console.log(this.duenoInfo)
    })

    this.paseadorService.getPaseador(this.mascotaInfo.walker_ID).subscribe(respuesta =>{
      this.paseador = respuesta as Paseador[];
      this.paseadorInfo = this.paseador[0];
      console.log(this.paseadorInfo)
    })
  }

  del(){

    this.mascotaService.deleteMascota(this.id_s).subscribe(respuesta2 =>{
      console.log("Borrado!")
      this.router.navigate(['/manageboard'])
    })

  }


}
