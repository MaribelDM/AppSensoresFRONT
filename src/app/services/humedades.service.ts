import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

  public listar(humedad : string): Observable<Humedad[]> {
//    return this.http.get<Humedad[]>(this.baseEndpoint).pipe(
  //    map(alumnos => alumnos as Humedad[])
    //)
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Humedad[]>(this.baseEndpoint + '/humedades/?name=' + humedad, { headers }).pipe(
      tap(data => console.log('All', JSON.stringify(data))), catchError(this.handleError)
      
      );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    return throwError(errorMessage);
    }

  public actual(): Observable<Humedad> {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<Humedad>(this.baseEndpoint + '/humedadActual', {headers});
  }

  public media(): Observable<estadisticasHumedad>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<estadisticasHumedad>(this.baseEndpoint + '/media', {headers});
  }

  public humedadesFecha(startDate : String , endDate : String): Observable<Humedad[]>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Humedad[]>(this.baseEndpoint + '/humedades/{startDate}/{endDate}', {headers});
  }
}
