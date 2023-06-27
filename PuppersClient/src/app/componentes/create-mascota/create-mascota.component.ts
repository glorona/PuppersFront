import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { Paseador } from 'src/app/interfaces/paseador';
import { MascotaService } from 'src/app/servicios/mascota.service';
const now = new Date();
@Component({
  selector: 'app-create-mascota',
  templateUrl: './create-mascota.component.html',
  styleUrls: ['./create-mascota.component.css']
})
export class CreateMascotaComponent {
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
  constructor(private paseadorService:PaseadorService,private cliService:ClienteService, private router:Router, private mascotaService:MascotaService){
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
