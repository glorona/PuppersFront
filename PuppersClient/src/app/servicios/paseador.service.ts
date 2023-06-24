import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaseadorService {

  constructor(private http: HttpClient) { }

  getPaseadores(){
    return this.http.get('https://puppersappback-production.up.railway.app/paseadores/all')
  }
}
