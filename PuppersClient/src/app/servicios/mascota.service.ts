import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(private http: HttpClient) { }
/*
getMascotas() : Observable<Mascota[]>{
    return this.http.get<MascotaResponse>('http://localhost:4001/mascotas/all').pipe(map((res)=>res.results));
  }*/

  getMascotas(){
    return this.http.get('https://puppersappback-production.up.railway.app/mascotas/all').pipe();
  }
  getMascota(id:string){
    return this.http.get(`https://puppersappback-production.up.railway.app/mascotas/${id}`).pipe();
  } 

}
