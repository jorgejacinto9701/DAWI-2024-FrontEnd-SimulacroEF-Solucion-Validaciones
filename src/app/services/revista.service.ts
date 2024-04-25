import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Revista } from '../models/revista.model';


const baseUrlRevista = AppSettings.API_ENDPOINT+ '/revista';
const baseUrlCrudRevista = AppSettings.API_ENDPOINT+ '/crudRevista';
const baseUrlConsultaRevista = AppSettings.API_ENDPOINT+ '/consultaRevista';

@Injectable({
  providedIn: 'root'
})
export class RevistaService {

  constructor(private http:HttpClient) { }

  //PC1 - Registrar
  registrar(data:Revista):Observable<any>{
    return this.http.post(baseUrlRevista, data);
  }

  //PC2 - CRUD
  registrarCrud(data:Revista):Observable<any>{
    return this.http.post(baseUrlCrudRevista+"/registraRevista", data);
  }
  actualizarCrud(data:Revista):Observable<any>{
    return this.http.put(baseUrlCrudRevista+"/actualizaRevista", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudRevista+"/eliminaRevista/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudRevista+"/listaRevistaPorNombreLike/"+ filtro);
  }

  //PC3 - CONSULTA

  consultarRevistaComplejo(nom:string, fre:string, desde:string, hasta:string, est:number, p:number, t:number):Observable<any>{
    const params = new HttpParams()
    .set("nombre", nom)
    .set("frecuencia", fre)
    .set("fecDesde", desde)
    .set("fecHasta", hasta)
    .set("estado", est)
    .set("idPais", p)
    .set("idTipo", t);

    return this.http.get(baseUrlConsultaRevista+"/consultaRevistaPorParametros", {params});
  }
}
