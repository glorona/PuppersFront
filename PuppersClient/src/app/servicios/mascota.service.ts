import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private http: HttpClient) { }

  getMascotas(){
    return this.http.get('http://localhost:4001/mascotas/all')
  }
}
