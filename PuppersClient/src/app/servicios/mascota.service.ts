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
  getMascotabyClient(id:string){
    return this.http.get(`https://puppersappback-production.up.railway.app/mascotas/cliente/${id}`).pipe();
  }
  getMascotabyWalker(id:string){
    return this.http.get(`https://puppersappback-production.up.railway.app/mascotas/paseador/${id}`).pipe();
  }

  getAllMascotasData(){
    return this.http.get('https://puppersappback-production.up.railway.app/mascotasQueries/clientes/paseadores/all')
  }

  registerMascota(tel:string, walker:string,name:string,breed:string,service:string,renovation_date:string){
    return this.http.post('https://puppersappback-production.up.railway.app/mascotas/add',{'client_tel':tel,'walker_ID':walker,'pet_name':name,'pet_breed':breed,'service':service,'renovation_date':renovation_date})
  }

  deleteMascota(id:string){
    return this.http.delete(`https://puppersappback-production.up.railway.app/mascotas/delete/${id}`)

  }

  updateMascota(id:number,walker:string,name:string,breed:string,service:string,renovation_date:string){

    return this.http.put('https://puppersappback-production.up.railway.app/mascotas/update',{'pet_token':id,'walker_ID':walker,'pet_name':name,'pet_breed':breed,'service':service,'renovation_date':renovation_date})

  }
}
