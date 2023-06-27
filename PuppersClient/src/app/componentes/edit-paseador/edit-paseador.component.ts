import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Cliente } from 'src/app/interfaces/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { Paseador } from 'src/app/interfaces/paseador';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
const now = new Date();
@Component({
  selector: 'app-edit-paseador',
  templateUrl: './edit-paseador.component.html',
  styleUrls: ['./edit-paseador.component.css']
})
export class EditPaseadorComponent {
  fecha = now;
  fechaString = this.fechaformat(this.fecha);
  clientes: Cliente[] = [];
  areas: string[] = [];
  localizaciones: string[] = [];
  selectedArea = 'default';
  selectedLocation = 'default';
  constructor(private mascotaService:MascotaService, private route:ActivatedRoute,private paseadorService:PaseadorService, private router:Router){
    this.telefono.valueChanges.subscribe(value =>{
      this.telefono.setValue(value,{emitEvent:false})
      this.telpaseador = this.telefono.value;
    })
    this.cedula.valueChanges.subscribe(value =>{
      this.cedula.setValue(value,{emitEvent:false})
      this.cedpaseador = this.cedula.value;
    })
    this.nombre.valueChanges.subscribe(value =>{
      this.nombre.setValue(value,{emitEvent:false})
      this.nompaseador = this.nombre.value;
    })
    this.username.valueChanges.subscribe(value =>{
      this.username.setValue(value,{emitEvent:false})
      this.userpaseador = this.username.value;
    })
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
  paseador: Paseador[] = [];
  paseadorInfo!: Paseador;
  mascotasAsignadas: Mascota[] = [];
  id_s = '';
  ngOnInit(){
    const {id} = this.route.snapshot.params;
    this.id_s = id;

    this.paseadorService.getPaseador(id).subscribe(respuesta2 =>{
      this.paseador = respuesta2 as Paseador[];
      this.paseadorInfo = this.paseador[0];
      this.telefono.setValue(this.paseadorInfo.walker_tel,{emitEvent:false})
      this.cedula.setValue(this.paseadorInfo.walker_ID,{emitEvent:false})
      this.nombre.setValue(this.paseadorInfo.walker_name,{emitEvent:false})
      this.username.setValue(this.paseadorInfo.walker_user,{emitEvent:false})
      this.userpaseador = this.username.value;
      this.nompaseador = this.nombre.value;
      this.cedpaseador = this.cedula.value;
      this.telpaseador = this.telefono.value;
    })

    this.mascotaService.getMascotabyWalker(id).subscribe(respuesta =>{
      this.mascotasAsignadas = respuesta as Mascota[];
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
    console.log(this.cedpaseador);
    if(this.telefono.invalid || this.nombre.invalid || this.cedula.invalid || this.username.invalid){
      console.log("Error!");
      this.errorForm();
    }
    else{
      this.messageError = false;
      this.paseadorService.updatePaseador(this.cedpaseador,this.telpaseador,this.nompaseador,this.fechaString).subscribe(respuesta =>{  
        console.log(respuesta)
        this.router.navigate(['/manageboard'])
      })
    }

  }

}
