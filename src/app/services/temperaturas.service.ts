import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { estadisticasTemperatura } from '../models/estadisticas-temperatura';
import { Temperatura } from '../models/temperatura';

@Injectable({
  providedIn: 'root'
})
export class TemperaturasService {

  private baseEndpoint = 'http://localhost:8092/v1/aplicacion/temperatura';
  constructor(private http: HttpClient) {}

  public listar(): Observable<Temperatura[]> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Temperatura[]>(this.baseEndpoint + '/temperaturas')
  }

  public actual(): Observable<Temperatura>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Temperatura>(this.baseEndpoint + '/temperaturaActual')
  }

  public media(): Observable<estadisticasTemperatura>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<estadisticasTemperatura>(this.baseEndpoint + '/media')
  }

  public temperaturaFecha(startDate: String, endDate : String): Observable<Temperatura[]>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Temperatura[]>(this.baseEndpoint + '/temperaturas-fecha?endDate=' + endDate + '&startDate=' + startDate)
  }
}
