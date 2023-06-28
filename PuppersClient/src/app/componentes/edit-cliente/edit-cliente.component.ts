import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
const now = new Date();
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent {

  fecha = now;
  fechaString = this.fechaformat(this.fecha);
  clientes: Cliente[] = [];
  areas: string[] = [];
  localizaciones: string[] = [];
  selectedArea = 'default';
  selectedLocation = 'default';
  id_s = '';
  mascotasAsignadas: Mascota[] = [];
  cliente: Cliente[] = [];
  clienteInfo!: Cliente;
  constructor(private route:ActivatedRoute,private mascotaService:MascotaService, private cliService:ClienteService, private router:Router){
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

  }

  ngOnInit(){

    const {id} = this.route.snapshot.params;
    this.id_s = id;
    this.cliService.getCliente(id).subscribe(respuesta2 =>{
      this.cliente = respuesta2 as Cliente[];
      this.clienteInfo = this.cliente[0];
      this.telefono.setValue(this.clienteInfo.client_tel,{emitEvent:false});
      this.nombre.setValue(this.clienteInfo.client_name,{emitEvent:false});
      this.username.setValue(this.clienteInfo.client_user,{emitEvent:false})
      this.selectedLocation = this.clienteInfo.location;
      this.selectedArea = this.clienteInfo.area;
      this.telclient = this.telefono.value;
      this.nomclient = this.nombre.value;
      this.userclient = this.username.value;
    })

    this.mascotaService.getMascotabyClient(id).subscribe(respuesta =>{
      this.mascotasAsignadas = respuesta as Mascota[];
      console.log(this.mascotasAsignadas)
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

    if(this.selectedArea == 'default' || this.selectedLocation == 'default'){
      console.log("Error!");
      this.errorForm();
    }
    else{
      this.messageError = false;
      this.cliService.updateCliente(this.telclient,this.nomclient,this.fechaString,this.selectedLocation,this.selectedArea).subscribe(respuesta =>{
          
        console.log("Insertado!")
        this.router.navigate(['/manageboard'])
      })
    }

  }

}
