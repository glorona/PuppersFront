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

  registerCliente(cel:string, name: string, date: string, username: string, password: string, location:string, area:string){
    return this.http.post('https://puppersappback-production.up.railway.app/clientes/add',{'client_tel':cel, 'client_name':name, 'start_date':date,'client_user':username,'client_password':password, 'location':location, 'area':area})
  }

  deleteCliente(id:string){

    //return this.http.delete()

  }

}
