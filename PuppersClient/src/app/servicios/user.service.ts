import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }



  loginCliente(username: string, password: string): Observable<any>{

    return this.http.post('https://puppersappback-production.up.railway.app/clientes/log',{'client_user':username,'client_password':password}, httpOptions)
  }
  loginAdmin(username: string, password: string): Observable<any>{
    return this.http.post('https://puppersappback-production.up.railway.app/admin/log',{'admin_username':username,'admin_password':password})
  }
  loginPaseador(username: string, password: string): Observable<any>{
    return this.http.post('https://puppersappback-production.up.railway.app/paseadores/log',{'walker_user':username,'walker_password':password}, httpOptions)
  }

}
