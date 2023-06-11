import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Combo } from '../models/combo';

@Injectable({
  providedIn: 'root'
})
export class SensoresService {

  private baseEndpoint = 'http://localhost:8092/v1/aplicacion/sensores';
  constructor(private http: HttpClient) { }

  public getCombo(idUsuario: String, funcion : String): Observable<Combo[]>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Combo[]>(this.baseEndpoint + '?idUsuario=' + idUsuario + '&funcion=' + funcion, {headers})
  }
}
