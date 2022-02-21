import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
//import  { map } from 'rxjs/operators';
import { Humedad } from '../models/humedad';
import { catchError, retry, tap } from 'rxjs/operators';
import { estadisticasHumedad } from '../models/estadisticas-humedad';

@Injectable({
  providedIn: 'root'
})
export class HumedadesService {

  private baseEndpoint = 'http://localhost:8092/v1/aplicacion/humedad';
  constructor(private http: HttpClient) { }

  public listar(): Observable<Humedad[]> {
//    return this.http.get<Humedad[]>(this.baseEndpoint).pipe(
  //    map(alumnos => alumnos as Humedad[])
    //)
    return this.http.get<Humedad[]>(this.baseEndpoint + '/humedades').pipe(
      tap(data => console.log('All', JSON.stringify(data))), catchError(this.handleError)
      
      );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    return throwError(errorMessage);
    }

  public actual(): Observable<Humedad> {
        return this.http.get<Humedad>(this.baseEndpoint + '/humedadActual');
  }

  public media(): Observable<estadisticasHumedad>{
    return this.http.get<estadisticasHumedad>(this.baseEndpoint + '/media');
  }
}
