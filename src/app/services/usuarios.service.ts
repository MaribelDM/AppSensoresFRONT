import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccesoUsuario } from '../models/accesoUsuarioRequest';
import { AccesoUsuarioResponse } from '../models/accesoUsuarioResponse';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseEndpoint = 'http://localhost:7001/auth/oauth/token';
  
  constructor(private http: HttpClient) {
   
  }

  public login(accesoUsuario:AccesoUsuario): Observable<AccesoUsuarioResponse>{
    console.info(accesoUsuario.client_id + ' '+  accesoUsuario.client_secret  )
    let search = new URLSearchParams();
    search.set('username', accesoUsuario.username);
    search.set('password', accesoUsuario.password);
    search.set('grant_type', accesoUsuario.grand_type);
    search.set('client_id', accesoUsuario.client_id);
    search.set('client_secret', accesoUsuario.client_secret);
    
    const credentials = btoa(accesoUsuario.client_id + ':' + accesoUsuario.client_secret);
    var headers = new HttpHeaders({
      'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
      //Sin esto el servicio devolveria un unauthorized
      'Authorization': 'Basic '+ credentials

    })
    const body =  JSON.stringify(accesoUsuario);
    return this.http.post<AccesoUsuarioResponse>(this.baseEndpoint , search.toString() , {headers : headers});
  }
}
1 