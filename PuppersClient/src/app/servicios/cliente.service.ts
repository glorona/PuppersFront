import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get('http://localhost:4001/clientes/all')
  }
    //  /mascotas/cliente/:client_tel 

    getCliente(id:string){
      return this.http.get(`http://localhost:4001/mascotas/cliente/:${id}`).pipe();
    } 
}
