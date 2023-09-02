import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Combo } from '../models/combo';
import { RegistroNuevoSensorRequest } from '../models/registroNuevoSensorRequest';

@Injectable({
  providedIn: 'root'
})
export class SensoresService {

  private baseEndpoint = 'http://localhost:8092/v1/aplicacion/sensores';
  registroParam = {
    idUsuario: undefined,
    idNotificacion: undefined,
    nombreSensor: undefined
};
  constructor(private http: HttpClient) { }

  public getCombo(idUsuario: String, funcion : String): Observable<Combo[]>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Combo[]>(this.baseEndpoint + '?idUsuario=' + idUsuario + '&funcion=' + funcion, {headers})
  }

  public registroSensor(request: RegistroNuevoSensorRequest[]): Observable<any[]>{
    const registrosParam = [];
        request.forEach(requestParam => {
          this.registroParam.idUsuario = requestParam.idUsuario
          this.registroParam.idNotificacion = requestParam.idNotificacion;
          this.registroParam.nombreSensor = requestParam.nombreSensor;
          registrosParam.push(this.registroParam);
          this.registroParam = {
            idUsuario: undefined,
            idNotificacion: undefined,
            nombreSensor: undefined
        };
        })
    
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>(this.baseEndpoint , registrosParam, {headers});
  }
}
