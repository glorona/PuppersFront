import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get('https://puppersappback-production.up.railway.app/clientes/all');
  }
    //  /mascotas/cliente/:client_tel 

  getCliente(id:string){
      return this.http.get(`https://puppersappback-production.up.railway.app/clientes/${id}`).pipe();
  }
  
  getClientesArea(){
    return this.http.get('https://puppersappback-production.up.railway.app/mascotasQueries/clientes/all');
  }

  getClientesAreaSpec(area: string){
    return this.http.get(`https://puppersappback-production.up.railway.app/mascotasQueries/clientes/area/${area}`);
  }

  getClientesLocation(loc: string){
    return this.http.get(`https://puppersappback-production.up.railway.app/mascotasQueries/clientes/location/${loc}`);
  }
}
