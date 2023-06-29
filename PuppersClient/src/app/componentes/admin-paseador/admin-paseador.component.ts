import { Component } from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { Paseador } from 'src/app/interfaces/paseador';

@Component({
  selector: 'app-admin-paseador',
  templateUrl: './admin-paseador.component.html',
  styleUrls: ['./admin-paseador.component.css']
})
export class AdminPaseadorComponent {

  mascotasAsignadas: Mascota[] = [];
  paseador: Paseador[] = [];
  paseadorInfo!: Paseador;
  id_s!: string;

  constructor(private route:ActivatedRoute, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){

  }

  ngOnInit(){

    const {id} = this.route.snapshot.params;
    this.id_s = id;

    this.paseadorService.getPaseador(id).subscribe(respuesta2 =>{
      this.paseador = respuesta2 as Paseador[];
      this.paseadorInfo = this.paseador[0];
    })

    this.mascotaService.getMascotabyWalker(id).subscribe(respuesta =>{
      this.mascotasAsignadas = respuesta as Mascota[];
      console.log(this.mascotasAsignadas)
    })

  }

  del(){

    this.paseadorService.deletePaseador(this.id_s).subscribe(respuesta2 =>{
      console.log("Borrado!")
      this.router.navigate(['/manageboard'])
    })

  }

}
