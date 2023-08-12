import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
import { Area } from 'src/app/interfaces/area';
import { Localizacion } from 'src/app/interfaces/localizacion';
const now = new Date();
@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent {
  fecha = now;
  fechaString = this.fechaformat(this.fecha);
  clientes: Cliente[] = [];
  areas: Area[] = [];
  localizaciones: Localizacion[] = [];
  selectedArea = 0;
  selectedLocation = 0;
  constructor(private cliService:ClienteService, private aloc:ArealocationService, private router:Router){
    cliService.getClientes().subscribe(respuesta => {
      this.clientes = respuesta as Cliente[];
    })

    aloc.getAreas().subscribe(respuesta =>{
      this.areas = respuesta as Area[];
    })

    aloc.getLocations().subscribe(respuesta =>{
      this.localizaciones = respuesta as Localizacion[];
    })




    this.telefono.valueChanges.subscribe(value =>{
      this.telefono.setValue(value,{emitEvent:false})
      this.telclient = this.telefono.value;
    })

    this.nombre.valueChanges.subscribe(value =>{
      this.nombre.setValue(value,{emitEvent:false})
      this.nomclient = this.nombre.value;
    })
    this.username.valueChanges.subscribe(value =>{
      this.username.setValue(value,{emitEvent:false})
      this.userclient = this.username.value;
    })

    this.email.valueChanges.subscribe(value =>{
      this.email.setValue(value,{emitEvent:false})
      this.emailclient = this.email.value;
    })

    this.cedula.valueChanges.subscribe(value =>{
      this.cedula.setValue(value,{emitEvent:false})
      this.cedclient = this.cedula.value;
    })

  }

  email = new FormControl('', [Validators.required, Validators.email]);
  telefono = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(11)]);
  cedula = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(11)]);
  nombre = new FormControl('',[Validators.required]);
  username = new FormControl('',[Validators.required]);
  formValid = false;
  messageError = false;
  telclient: any = this.telefono.value;
  nomclient: any = this.nombre.value;
  userclient: any = this.username.value;
  emailclient: any = this.email.value;
  cedclient: any = this.cedula.value;
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
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un mail!';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorCel(){
    let msg = ''
    if (this.telefono.hasError('required')){
      
      msg = 'Debe ingresar un telefono';
    }

    if(this.telefono.hasError('maxlength') || this.telefono.hasError('minlength')){
      msg = 'Formato Invalido de Telefono';
    }

    return msg;
  }

  getErrorCed(){
    let msg = ''
    if (this.cedula.hasError('required')){
      
      msg = 'Debe ingresar una cedula';
    }

    if(this.cedula.hasError('maxlength') || this.cedula.hasError('minlength')){
      msg = 'Formato Invalido de cedula';
    }

    return msg;
  }

  getErrorNombre(){
    let msg = ''
    if (this.nombre.hasError('required')){
      
      msg = 'Debe ingresar un nombre y apellido';
    }

    return msg;

  }

  getErrorUsername(){
    let msg = ''
    if (this.username.hasError('required')){
      
      msg = 'Debe ingresar un usuario';
    }

    return msg;

  }

  errorForm(){
    this.messageError = true;
    return 'Uno o mas parametros estan incorrectos. por favor revisa tus entradas!';

  }

  onSubmit(){

    if(this.telefono.invalid || this.nombre.invalid || this.username.invalid || this.selectedArea == 'default' || this.selectedLocation == 'default'){
      console.log("Error!");
      this.errorForm();
    }
    else{
      this.messageError = false;
      this.cliService.registerCliente(this.telclient, this.cedclient,this.nomclient,this.fechaString,this.userclient,this.cedclient,this.selectedLocation).subscribe(respuesta =>{
          
        console.log("Insertado!")
        this.router.navigate(['/manageboard'])
      })
    }

  }

}
