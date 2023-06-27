import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ActivatedRoute, Router } from '@angular/router';
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
  areas: string[] = [];
  localizaciones: string[] = [];
  selectedArea = 'default';
  selectedLocation = 'default';
  constructor(private cliService:ClienteService, private router:Router){
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

  }

  email = new FormControl('', [Validators.required, Validators.email]);
  telefono = new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(12)]);
  nombre = new FormControl('',[Validators.required]);
  username = new FormControl('',[Validators.required]);
  formValid: boolean = false;
  messageError: boolean = false;
  telclient: any = this.telefono.value;
  nomclient: any = this.nombre.value;
  userclient: any = this.username.value;

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
    console.log(this.fecha);
    if (this.email.hasError('required')) {
      return 'Debe ingresar un mail!';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
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

    if(this.telefono.invalid || this.nombre.invalid || this.username.invalid || this.selectedArea == 'default' || this.selectedLocation == 'default'){
      console.log("Error!");
      this.errorForm();
    }
    else{
      this.messageError = false;
      this.cliService.registerCliente(this.telclient,this.nomclient,this.fechaString,this.userclient,this.telclient,this.selectedLocation,this.selectedArea).subscribe(respuesta =>{
          
        console.log("Insertado!")
        this.router.navigate(['/manageboard'])
      })
    }

  }

}
