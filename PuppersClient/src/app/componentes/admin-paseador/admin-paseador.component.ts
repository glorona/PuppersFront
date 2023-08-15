import { Component } from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { Paseador } from 'src/app/interfaces/paseador';
import { ServicioService } from 'src/app/servicios/servicio.service';

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
  link_defaultpaseador = "https://firebasestorage.googleapis.com/v0/b/puppersimage.appspot.com/o/puppers%2Fprofile.png?alt=media&token=0778deb9-2a8e-4e82-8f38-b42a7861c40c"
  link = "";
  constructor(private route:ActivatedRoute, private serv:ServicioService, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){

  }

  ngOnInit(){

    const {id} = this.route.snapshot.params;
    this.id_s = id;

    this.paseadorService.getPaseador(id).subscribe(respuesta2 =>{
      this.paseador = respuesta2 as Paseador[];
      this.paseadorInfo = this.paseador[0];
      if(this.paseadorInfo.walker_photoURL == "" || this.paseadorInfo.walker_photoURL == null){
        this.link = this.link_defaultpaseador
      }
      else{
        this.link = this.paseadorInfo.walker_photoURL
      }
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
