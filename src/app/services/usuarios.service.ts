import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccesoUsuario } from '../models/accesoUsuarioRequest';
import { AccesoUsuarioResponse } from '../models/accesoUsuarioResponse';
import { RegistroUsuario } from '../models/registroUsuarioRequest';
import { Usuario } from '../models/usuario';
import { NuevaContraseñaRequest } from '../models/nuevaContraseñaRequest';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private baseEndpoint = 'http://localhost:7001/auth/oauth/token';
 
  private baseEndpointRegistro = 'http://localhost:7001/auth/sign-up';
  
  private baseEndpointObtenerUsuario = 'http://localhost:8092/v1/aplicacion';

  constructor(private http: HttpClient) {
   
  }

  public haySesion():Boolean{
    return localStorage.getItem('token') != null;
  }

  public login(accesoUsuario:AccesoUsuario): Observable<AccesoUsuarioResponse>{
    let params = new URLSearchParams();
    params.set('username', accesoUsuario.username);
    params.set('password', accesoUsuario.password);
    params.set('grant_type', accesoUsuario.grand_type);
    params.set('client_id', accesoUsuario.client_id);
    params.set('client_secret', accesoUsuario.client_secret);
    
    const credentials = btoa(accesoUsuario.client_id + ':' + accesoUsuario.client_secret);
    var headers = new HttpHeaders({
      'Content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
      //Sin esto el servicio devolveria un unauthorized
      'Authorization': 'Basic '+ credentials

    })
    const body =  JSON.stringify(accesoUsuario);
    return this.http.post<AccesoUsuarioResponse>(this.baseEndpoint , params.toString() , {headers : headers});
  }

  public registro(registroUsuario:RegistroUsuario): Observable<Usuario>{
    
    const registroParam = {
      password : registroUsuario.password,
      passwordVerification : registroUsuario.passwordVerification,
      username:  registroUsuario.username,
      name : registroUsuario.name,
      enabled : (registroUsuario.enabled) ? true : false,
      role : registroUsuario.role,
    };
    const body =  JSON.stringify(registroUsuario);
    return this.http.post<Usuario>(this.baseEndpointRegistro , registroParam);
    
  }

  public getUsuario():Observable<Usuario>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Usuario>(this.baseEndpointObtenerUsuario + "/usuario", {headers});
  }

  public getUsuarios():Observable<Usuario[]>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Usuario[]>(this.baseEndpointObtenerUsuario + "/usuarios", {headers});
  }

  public actualizarContraseña(nuevaContraseñaRequest:NuevaContraseñaRequest):Observable<any>{
    
    const nuevaContraseñaParam = {
      nombreUsuario : nuevaContraseñaRequest.nombreUsuario,
      nuevaContraseña : nuevaContraseñaRequest.nuevaContraseña,
      verificacionNuevaContraseña:  nuevaContraseñaRequest.verificacionNuevaContraseña
    };
    return this.http.post(this.baseEndpointRegistro + "/actualizar-contrasenia" , nuevaContraseñaParam);
  }
}
1 