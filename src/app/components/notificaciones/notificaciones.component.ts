import {Component, OnInit} from '@angular/core';
import { Observer } from 'rxjs';
import {ActualizarNotificacionRequest} from 'src/app/models/actualizarNotificacionRequest';
import {SensorNotificacion} from 'src/app/models/sensorNotificacion';
import {AlertService} from 'src/app/services/alert.service';
import {NotificacionService} from 'src/app/services/notificaciones.service';
import { SensoresService } from 'src/app/services/sensores.service';

@Component({selector: 'app-notificaciones', templateUrl: './notificaciones.component.html', styleUrls: ['./notificaciones.component.css']})
export class NotificacionesComponent implements OnInit {
    seleccionado : any[];
    notificacionesNoLeidas = [];
    notificacionNoLeida  = {
        id: undefined,
        nombre: undefined,
        hayElementos: undefined,
        observacionUsuario: undefined,
        observacionAdmin: undefined,
        tipo: undefined,
        estado: undefined,
        leida: undefined,
        cambiado: undefined,
        nombreUsuario: undefined,
        aprobada:undefined,
        noAprobada:undefined
    }

    notificacionesLeidas = [];
    notificacionLeida  = {
        id: undefined,
        nombre: undefined,
        hayElementos: undefined,
        observacionUsuario: undefined,
        observacionAdmin: undefined,
        tipo: undefined,
        estado: undefined,
        leida: undefined,
        cambiado: undefined,
        nombreUsuario: undefined,
        aprobada:undefined,
        eliminar:undefined
    }

    actualizarNotificaciones = [];
    actualizarNotificacion = {
        id: undefined,
        estado: undefined,
        observacion: undefined
    };
    eliminarNotificaciones = [];
    eliminarNotiticacion ={
        id:undefined
    }
    registroNuevosSensoresRequest = [];
    registroNuevoSensorRequest = {
        idUsuario:undefined,
        idNotificacion:undefined,
	    nombreSensor:undefined
    }
    APROBADA_LEIDA = 0;
    NO_APROBADA_LEIDA = 1;
    PENDIENTE_LEIDA = 2;
    APROBADA_NO_LEIDA = 3;
    NO_APROBADA_NO_LEIDA = 4;
    PENDIENTE_NO_LEIDA = 5;
    estadosNoLeidoUsu = [this.NO_APROBADA_NO_LEIDA, this.APROBADA_NO_LEIDA]
    estadosLeidoUsu = [this.NO_APROBADA_LEIDA, this.APROBADA_LEIDA];
    estadosNoLeidoAd = [this.PENDIENTE_NO_LEIDA];
    estadosLeidoAd = [this.PENDIENTE_LEIDA];
    constructor(private notificacionService : NotificacionService, private alertService : AlertService, private sensorService: SensoresService) {}

    ngOnInit(): void {
      this.notificacionesLeidas = [];
      this.notificacionesNoLeidas = [];
      if(!this.admin()){
        this.cargarValores(this.estadosNoLeidoUsu, this.estadosLeidoUsu);
      }else{
        this.cargarValores(this.estadosNoLeidoAd, this.estadosLeidoAd);
      }
    }

    cargarValores(estadosNoLeido : number[], estadosLeido : number[]){
      this.notificacionService.obtenerNotificaciones(estadosNoLeido).subscribe(notificaciones => notificaciones.forEach(notificacion => {
        this.notificacionNoLeida.id = notificacion.id;
        this.notificacionNoLeida.nombre = notificacion.nombre;
        this.notificacionNoLeida.tipo =  (
        notificacion.tipo == "H" ? "Humedad DHT22" : "Temperatura DHT22"
    );
        this.notificacionNoLeida.hayElementos = notificacion.hayElementos == "N" ? "Necesitará instalación" : "Propia instalación";
        this.notificacionNoLeida.observacionUsuario = notificacion.observacionUsuario;
        this.notificacionNoLeida.observacionAdmin = notificacion.observacionAdmin;
        this.notificacionNoLeida.estado = notificacion.estado == "NO APROBADA NO LEIDA" ? "No aprobado" : "Aprobado";
        this.notificacionNoLeida.leida = false;
        this.notificacionNoLeida.cambiado = false;
        this.notificacionNoLeida.aprobada = false;
        this.notificacionNoLeida.noAprobada = false;
        this.notificacionNoLeida.nombreUsuario = notificacion.nombreUsuario;
        this.notificacionesNoLeidas.push(this.notificacionNoLeida);
        this.notificacionNoLeida = {
            id: undefined,
            nombre: undefined,
            hayElementos: undefined,
            observacionUsuario: undefined,
            observacionAdmin: undefined,
            tipo: undefined,
            estado: undefined,
            leida: undefined,
            cambiado: undefined,
            nombreUsuario: undefined,
            aprobada:undefined,
            noAprobada:undefined
        }
    }))

    this.notificacionService.obtenerNotificaciones(estadosLeido).subscribe(notificaciones => notificaciones.forEach(notificacion => {
        this.notificacionLeida.id = notificacion.id;
        this.notificacionLeida.nombre = notificacion.nombre;
        this.notificacionLeida.tipo = (
        notificacion.tipo == "H" ? "Humedad DHT22" : "Temperatura DHT22"
    );
        this.notificacionLeida.hayElementos = notificacion.hayElementos == "N" ? "Necesitará instalación" : "Propia instalación";
        this.notificacionLeida.observacionUsuario = notificacion.observacionUsuario;
        this.notificacionLeida.observacionAdmin = notificacion.observacionAdmin;
        this.notificacionLeida.estado = notificacion.estado == "NO APROBADA LEIDA" ? "No aprobado" : "Aprobado";
        this.notificacionLeida.cambiado = false;
        this.notificacionLeida.eliminar = false;
        this.notificacionLeida.nombreUsuario = notificacion.nombreUsuario;
        this.notificacionesLeidas.push(this.notificacionLeida);
        this.notificacionLeida = {
            id: undefined,
            nombre: undefined,
            hayElementos: undefined,
            observacionUsuario: undefined,
            observacionAdmin: undefined,
            tipo: undefined,
            estado: undefined,
            leida: undefined,
            cambiado: undefined,
            nombreUsuario: undefined,
            aprobada:undefined,
            eliminar:undefined
        }
    }))
    }

    cambioObservacionUsuario(id : number, idLista : string) {
        if (idLista == 'No leida') {
            this.notificacionesNoLeidas.forEach(notificacion => {
                if (notificacion.id == id) {
                    notificacion.cambiado = true;

                }
            })
        } else {
            this.notificacionesLeidas.forEach(notificacion => {
                if (notificacion.id == id) {
                    notificacion.cambiado = true;

                }
            })
        }
    }

    cambioObservacionAdmin(id : number) {
        
            this.notificacionesNoLeidas.forEach(notificacion => {
                if (notificacion.id == id) {
                    notificacion.cambiado = true;

                }
            })
        
    }

    admin(): Boolean {
        return localStorage.getItem('rol') == '0';
    }

    actualizarObservacion() {
        const jsonData = JSON.stringify(this.notificacionesNoLeidas);
        if(!this.admin()){
        this.notificacionesNoLeidas.forEach(notificacion => {
            if ( (notificacion.leida == true && notificacion.estado != 'Aprobado')|| notificacion.cambiado == true) {
                this.actualizarNotificacion.id = notificacion.id;
                this.actualizarNotificacion.observacion = this.admin() ? notificacion.observacionAdmin : notificacion.observacionUsuario;
                this.actualizarNotificacion.estado = this.getEstado(notificacion.estado, notificacion.leida, notificacion.cambiado);
                this.actualizarNotificaciones.push(this.actualizarNotificacion);
                this.actualizarNotificacion = {
                    id: undefined,
                    observacion: undefined,
                    estado: undefined
                }
            }else if(notificacion.leida == true && notificacion.estado == 'Aprobado'){
                 //AQUI HAGO UN INSERT DEL NUEVO SENSOR
                 this.registroNuevoSensorRequest.idUsuario =localStorage.getItem('id');
                 this.registroNuevoSensorRequest.nombreSensor = notificacion.nombre;
                 this.registroNuevoSensorRequest.idNotificacion = notificacion.id;
                 this.registroNuevosSensoresRequest.push(this.registroNuevoSensorRequest);
                 this.registroNuevoSensorRequest = {
                    idUsuario : undefined,
                    idNotificacion: undefined,
                    nombreSensor : undefined
                 }
            }
        })
        this.notificacionesLeidas.forEach(notificacion => {
            if (notificacion.cambiado == true) {
                this.actualizarNotificacion.id = notificacion.id;
                this.actualizarNotificacion.observacion = this.admin() ? notificacion.observacionAdmin : notificacion.observacionUsuario;
                this.actualizarNotificacion.estado = this.getEstado(notificacion.estado, notificacion.leida, notificacion.cambiado);
                this.actualizarNotificaciones.push(this.actualizarNotificacion);
                this.actualizarNotificacion = {
                    id: undefined,
                    observacion: undefined,
                    estado: undefined
                }
            }else if(notificacion.eliminar == true){
                this.eliminarNotiticacion.id = notificacion.id;
                this.eliminarNotificaciones.push(this.eliminarNotiticacion.id);
                this.eliminarNotiticacion = {
                    id: undefined
                }
            }
        })
    }else{
        this.notificacionesNoLeidas.forEach(notificacion => {
            if (notificacion.aprobada == true || notificacion.cambiado == true || notificacion.noAprobada == true ) {
                this.actualizarNotificacion.id = notificacion.id;
                this.actualizarNotificacion.observacion = this.admin() ? notificacion.observacionAdmin : notificacion.observacionUsuario;
                this.actualizarNotificacion.estado = this.getEstadoPendientes(notificacion.aprobada, notificacion.noAprobada, notificacion.cambiado);
                this.actualizarNotificaciones.push(this.actualizarNotificacion);
                this.actualizarNotificacion = {
                    id: undefined,
                    observacion: undefined,
                    estado: undefined
                }
            }else if(notificacion.eliminar == true){

                this.eliminarNotificaciones.push(notificacion.id);
                
            }
        })
    }
        //ELIMINAR NOTIFICACIONES
        if(this.eliminarNotificaciones.length != 0){
            this.notificacionService.eliminarNotificaciones(this.eliminarNotificaciones).subscribe((response) =>{
            this.eliminarNotificaciones.splice(0, this.eliminarNotificaciones.length);
            this.alertService.setPopUp(true, "Se ha borrado la notificacion correctamente", "Cerrar");})
        }
        //ACTUALIZACION DE ESTADO 
        if(this.actualizarNotificaciones.length != 0){
            this.notificacionService.actualizarNotificaciones(this.actualizarNotificaciones, this.admin()).subscribe((response) => {
            this.notificacionService.obtenerNotificaciones([this.PENDIENTE_NO_LEIDA])
            .subscribe(notificaciones => 
                localStorage.setItem('numNotificacionesPendientes', notificaciones.length.toString())
                )
                this.alertService.setPopUp(true, "Se han realizado los cambios correctamente", "Cerrar");
            }, 
            (error) => this.alertService.setPopUp(true, error.error.message, "Cerrar") );
        }
        //AQUI REGISTRO DE SENSORES NUEVOS 
        if(this.registroNuevosSensoresRequest.length != 0){
            this.sensorService.registroSensor(this.registroNuevosSensoresRequest).subscribe(this.observerRegistroSensores);
                //(response) =>{
                //this.alertService.setPopUp(true, "Se han insertado nuevos registros de sensores", "Cerrar");
            //}  , 
            //(error) => {this.alertService.setAlert(true, error.error.message);});
        }
        this.actualizarNumNotificaciones(); //lo he cambiado arriba 
        
        //this.ngOnInit(); //esto seria para recargar la pagina para que salga la campana y se recarguen las notificaciones
    }

    actualizarNumNotificaciones(){
        this.notificacionService.obtenerNotificaciones([this.NO_APROBADA_NO_LEIDA, this.APROBADA_NO_LEIDA])
        .subscribe(notificaciones => 
          localStorage.setItem('numNotificaciones', notificaciones.length.toString())
          )
        
    }
    
    getEstado(estado : String, leida : boolean, cambiado : boolean): number {
        if (leida && estado == 'No aprobado') {
            return this.NO_APROBADA_LEIDA;
        }
        else if (leida && estado == 'Aprobado') {
             return this.APROBADA_LEIDA;
        } else if (cambiado) {
            return this.PENDIENTE_NO_LEIDA;
        } 
        return 0;

    }

    getEstadoPendientes(aprobada : boolean, noAprobada:boolean, cambiado : boolean): number {
        if ((aprobada && cambiado) || aprobada) {
            return this.APROBADA_NO_LEIDA;
        }else if((noAprobada && cambiado) || cambiado || noAprobada){
            return this.NO_APROBADA_NO_LEIDA;
        }
        return 0;
    }

    observerRegistroSensores: Observer<any> = {
        next: (token: any) => {
            this.alertService.setPopUp(true, "Se han insertado nuevos registros de sensores", "Cerrar");
            this.notificacionService.obtenerNotificaciones([this.PENDIENTE_NO_LEIDA])
            .subscribe(notificaciones => 
                localStorage.setItem('numNotificacionesPendientes', notificaciones.length.toString())
                )
        },
        error: (error: any) => {
          if (error.status === 400) {
            this.alertService.setAlert(true, error.error.message);
          } 
        },
        complete: () => {
          //nada
        }
    };

}
