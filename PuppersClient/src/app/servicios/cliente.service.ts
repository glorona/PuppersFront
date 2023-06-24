import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get('https://puppersappback-production.up.railway.app/clientes/all')
  }
    //  /mascotas/cliente/:client_tel 

    getCliente(id:string){
      return this.http.get(`https://puppersappback-production.up.railway.app/clientes/${id}`);
    } 
}
