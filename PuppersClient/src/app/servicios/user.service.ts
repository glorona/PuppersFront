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
    return this.http.post('http://localhost:4001/clientes/log',{username,password}, httpOptions)
  }
  loginAdmin(username: string, password: string): Observable<any>{
    console.log(username)
    console.log(password)
    return this.http.post('http://localhost:4001/admin/log',{'admin_username':username,'admin_password':password})
  }
  loginPaseador(username: string, password: string): Observable<any>{
    return this.http.post('http://localhost:4001/paseadores/log',{username,password}, httpOptions)
  }

  registerCliente(cel:string, name: string, date: string, username: string, password: string, location:string, area:string): Observable<any>{
    return this.http.post('http://localhost:4001/clientes/add',{cel, name, date,username,password, location, area}, httpOptions)
  }
  registerAdmin(username: string, password: string): Observable<any>{
    return this.http.post('http://localhost:4001/admin/add',{username,password}, httpOptions)
  }

  registerPaseador(ced: string, cel: string, date: string, username: string, password: string): Observable<any>{
    return this.http.post('http://localhost:4001/paseadores/add',{ced, cel, date, username,password}, httpOptions)
  }
}
