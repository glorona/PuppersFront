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
  getPaseador(id:String){
    return this.http.get(`https://puppersappback-production.up.railway.app/paseadores/${id}`)
  
  }

  getMascotasPaseador(id: String){
    return this.http.get(`https://puppersappback-production.up.railway.app/mascotasQueries/paseadores/${id}`);
  }

  registerPaseador(ced: string, cel: string, name:string, date: string, username: string, password: string){
    return this.http.post('https://puppersappback-production.up.railway.app/paseadores/add',{'walker_id':ced, 'walker_tel':cel, 'start_date':date, 'walker_user':username,'walker_password':password})
  }

  deletePaseador(id: string){

    return this.http.delete(`https://puppersappback-production.up.railway.app/paseadores/delete/${id}`)
  }
  
}
