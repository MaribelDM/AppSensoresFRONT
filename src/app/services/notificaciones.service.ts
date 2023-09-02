import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
// import  { map } from 'rxjs/operators';
import {Humedad} from '../models/humedad';
import {catchError, retry, tap} from 'rxjs/operators';
import {estadisticasHumedad} from '../models/estadisticas-humedad';
import {PeticionNotificacionRequest} from '../models/peticionNotificacionRequest';
import {SensorNotificacion} from '../models/sensorNotificacion';
import {ActualizarNotificacionRequest} from '../models/actualizarNotificacionRequest';

@Injectable({providedIn: 'root'})
export class NotificacionService {
    estadosString = "";
    idsString = "";
    private baseEndpoint = 'http://localhost:8092/v1/aplicacion/notificacion';
    peticionParam = {
        id: undefined,
        estado: undefined,
        observacion: undefined
    };
    constructor(private http : HttpClient) {}

    public registro(notificacionRequest : PeticionNotificacionRequest): Observable < any[] > {

        const notificacionParam = {
            hayElementosSensor: notificacionRequest.hayElementosSensor,
            idUsuario: notificacionRequest.idUsuario,
            nombreSensor: notificacionRequest.nombreSensor,
            observaciones: notificacionRequest.observaciones,
            tipoSensor: notificacionRequest.tipoSensor
        };
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.post<any[]>(this.baseEndpoint, notificacionParam, {headers});

    }

    public obtenerNotificaciones(estados : number[]): Observable < SensorNotificacion[] > {
        this.estadosString = estados.join(",");
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.get<SensorNotificacion[]>(this.baseEndpoint + "?estados=" + this.estadosString, {headers});

    }

    public actualizarNotificaciones(peticionesActualizar : ActualizarNotificacionRequest[], flagAdmin:Boolean): Observable < any > {
        const peticionesParam = [];
        peticionesActualizar.forEach(peticion => {
            this.peticionParam.id = peticion.id
            this.peticionParam.estado = peticion.estado;
            this.peticionParam.observacion = peticion.observacion;
            peticionesParam.push(this.peticionParam);
            this.peticionParam = {
                id: undefined,
                estado: undefined,
                observacion: undefined
            };
            
        })
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.put<any>(this.baseEndpoint + "?flagAdmin=" + flagAdmin, peticionesParam, {headers});

    }

    public eliminarNotificaciones(ids : number[]): Observable < any[] > {
        this.idsString = ids.join(",");
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.http.delete<any[]>(this.baseEndpoint + "?ids=" + this.idsString, {headers});

    }
}
