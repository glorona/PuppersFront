import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  address_test = "http://localhost:4001"
  address_prod = "https://puppersappback-production.up.railway.app"
  address = ""
  TEST = true;
  tokenusr: any;

  constructor(private http: HttpClient,private token: TokenService) {
    this.tokenusr = token.getToken();
    if(this.TEST){
      this.address = this.address_test;
    }
    else{
      this.address = this.address_prod;
    }

   }

  getClientes(){
    return this.http.get(this.address+'/clientes/all',{headers:{'auth':this.tokenusr}});
  }
    //  /mascotas/cliente/:client_tel 

  getCliente(id:string){
      return this.http.get(this.address+`/clientes/${id}`,{headers:{'auth':this.tokenusr}}).pipe();
  }
  
  getClientesArea(){
    return this.http.get(this.address+'/mascotasQueries/clientes/all',{headers:{'auth':this.tokenusr}});
  }

  getClientesAreaSpec(area: string){
    return this.http.get(this.address+`/mascotasQueries/clientes/area/${area}`,{headers:{'auth':this.tokenusr}});
  }

  getClientesLocation(loc: string){
    return this.http.get(this.address+`/mascotasQueries/clientes/location/${loc}`,{headers:{'auth':this.tokenusr}});
  }

  registerCliente(cel:string, name: string, date: string, username: string, password: string, location:string, area:string){
    return this.http.post(this.address+'/clientes/add',{'client_tel':cel, 'client_name':name, 'start_date':date,'client_user':username,'client_password':password, 'location':location, 'area':area},{headers:{'auth':this.tokenusr}})
  }

  deleteCliente(id:string){

    return this.http.delete(this.address+`/clientes/delete/${id}`,{headers:{'auth':this.tokenusr}})

  }

  updateCliente(cel:string, name: string, date: string, location:string, area:string){

    return this.http.put(this.address+'/clientes/update',{'client_tel':cel, 'client_name':name, 'start_date':date, 'location':location, 'area':area},{headers:{'auth':this.tokenusr}})

  }

}
