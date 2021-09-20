import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
//import  { map } from 'rxjs/operators';
import { Humedad } from '../models/humedad';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HumedadesService {

  private baseEndpoint = 'http://localhost:8092/v1/aplicacion/humedad/humedades';
  constructor(private http: HttpClient) { }

  public listar(): Observable<Humedad[]> {
//    return this.http.get<Humedad[]>(this.baseEndpoint).pipe(
  //    map(alumnos => alumnos as Humedad[])
    //)
    return this.http.get<Humedad[]>(this.baseEndpoint);
  }
}
