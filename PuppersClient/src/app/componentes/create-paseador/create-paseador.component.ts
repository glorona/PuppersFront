import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { PaseadorService } from 'src/app/servicios/paseador.service';
const now = new Date();
@Component({
  selector: 'app-create-paseador',
  templateUrl: './create-paseador.component.html',
  styleUrls: ['./create-paseador.component.css']
})
export class CreatePaseadorComponent {
  fecha = now;
  fechaString = this.fechaformat(this.fecha);
  clientes: Cliente[] = [];
  areas: string[] = [];
  localizaciones: string[] = [];
  selectedArea = 'default';
  selectedLocation = 'default';
  constructor(private paseadorService:PaseadorService, private router:Router){

  }

  telefono = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(12)]);
  cedula = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(12)]);
  nombre = new FormControl('',[Validators.required]);
  username = new FormControl('',[Validators.required]);
  formValid: boolean = false;
  messageError: boolean = false;
  telpaseador: any = this.telefono.value;
  nompaseador: any = this.nombre.value;
  userpaseador: any = this.username.value;
  cedpaseador: any = this.cedula.value;

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

  getErrorCel(){
    var msg = ''
    if (this.telefono.hasError('required')){
      
      msg = 'Debe ingresar un telefono';
    }

    if(this.telefono.hasError('maxlength') || this.telefono.hasError('minlength')){
      msg = 'Formato Invalido de Telefono';
    }

    return msg;
  }

  getErrorCed(){
    var msg = ''
    if (this.cedula.hasError('required')){
      
      msg = 'Debe ingresar un numero de cedula';
    }

    if(this.cedula.hasError('maxlength') || this.cedula.hasError('minlength')){
      msg = 'Formato Invalido de cedula';
    }

    return msg;
  }

  getErrorNombre(){
    var msg = ''
    if (this.nombre.hasError('required')){
      
      msg = 'Debe ingresar un nombre y apellido';
    }

    return msg;

  }

  getErrorUsername(){
    var msg = ''
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

    if(this.telefono.invalid || this.nombre.invalid || this.cedula.invalid || this.username.invalid){
      console.log("Error!");
      this.errorForm();
    }
    else{
      this.messageError = false;
      this.paseadorService.registerPaseador(this.cedpaseador,this.telpaseador,this.nompaseador,this.fechaString,this.userpaseador,this.cedpaseador).subscribe(respuesta =>{  
        console.log("Insertado!")
        this.router.navigate(['/manageboard'])
      })
    }

  }

}
