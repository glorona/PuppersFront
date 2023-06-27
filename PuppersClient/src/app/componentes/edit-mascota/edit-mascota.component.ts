import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
const now = new Date();
@Component({
  selector: 'app-edit-mascota',
  templateUrl: './edit-mascota.component.html',
  styleUrls: ['./edit-mascota.component.css']
})
export class EditMascotaComponent {
  mascotasAsignadas: Mascota[] = [];
  mascota: Mascota[] = [];
  dueno: Cliente[] = [];
  paseador: Paseador[] = [];
  id_s!: string;
  duenoInfo!: Cliente;
  paseadorInfo!: Paseador;
  mascotaInfo!: Mascota;
  fecha = now;
  fechaString = this.fechaformat(this.fecha);
  clientes: Cliente[] = [];
  areas: string[] = [];
  localizaciones: string[] = [];
  selectedArea = 'default';
  selectedLocation = 'default';
  selectedPaseador = 'default';
  selectedCliente = 'default';
  selectedService = 'default';
  paseadores: Paseador[] = [];
  nombre = new FormControl('',[Validators.required]);
  breed = new FormControl('',[Validators.required]);
  formValid: boolean = false;
  messageError: boolean = false;
  mascotaname: any = this.nombre.value;
  breedmasc: any = this.breed.value;


  constructor(private route:ActivatedRoute, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){
    clienteService.getClientes().subscribe(respuesta => {
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

    paseadorService.getPaseadores().subscribe(respuesta =>{
      this.paseadores = respuesta as Paseador[];
    })

    this.nombre.valueChanges.subscribe(value =>{
      this.nombre.setValue(value,{emitEvent:false})
      this.mascotaname = this.nombre.value;
    })
    this.breed.valueChanges.subscribe(value =>{
      this.breed.setValue(value,{emitEvent:false})
      this.breedmasc = this.breed.value;
    })



  }
  

  ngOnInit(){

    const {id} = this.route.snapshot.params;
    this.id_s = id;
    this.mascotaService.getMascota(id).subscribe(respuesta2 =>{
      this.mascota = respuesta2 as Mascota[];
      this.mascotaInfo = this.mascota[0];
      this.getData();

      this.breed.setValue(this.mascotaInfo.pet_breed,{emitEvent:false});
      this.breedmasc = this.breed.value;
      this.nombre.setValue(this.mascotaInfo.pet_name,{emitEvent:false});
      this.mascotaname = this.nombre.value;
    })

  }

  getData(){
    this.clienteService.getCliente(this.mascotaInfo.client_tel).subscribe(respuesta =>{
      this.dueno = respuesta as Cliente[];
      this.duenoInfo = this.dueno[0];
    })

    this.paseadorService.getPaseador(this.mascotaInfo.walker_ID).subscribe(respuesta =>{
      this.paseador = respuesta as Paseador[];
      this.paseadorInfo = this.paseador[0];
      this.selectedPaseador = this.paseadorInfo.walker_ID;
    })
  }
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  fechaformat(date: Date){
    return ([
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-'))
  }
  getErrorNombre(){
    var msg = ''
    if (this.nombre.hasError('required')){
      
      msg = 'Debe ingresar un nombre';
    }

    return msg;

  }

  getErrorbreed(){
    var msg = ''
    if (this.breed.hasError('required')){
      
      msg = 'Debe ingresar una raza';
    }

    return msg;

  }

  errorForm(){
    this.messageError = true;
    return 'Uno o mas parametros estan incorrectos. por favor revisa tus entradas!';

  }


  onSubmit(){

    if( this.nombre.invalid || this.breed.invalid || this.selectedCliente == 'default' || this.selectedPaseador == 'default' || this.selectedService){
      console.log("Error!");
      this.errorForm();
    }
    else{
      this.messageError = false;
      this.mascotaService.registerMascota(this.selectedCliente,this.selectedPaseador,this.mascotaname,this.breedmasc,this.selectedService,this.fechaString).subscribe(respuesta =>{
          
        console.log("Insertado!")
        this.router.navigate(['/manageboard'])
      })
    }

  }


}
