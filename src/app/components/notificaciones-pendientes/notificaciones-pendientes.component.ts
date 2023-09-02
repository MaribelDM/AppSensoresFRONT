import { Component } from '@angular/core';
import { SensorNotificacion } from 'src/app/models/sensorNotificacion';
import { NotificacionService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-notificaciones-pendientes',
  templateUrl: './notificaciones-pendientes.component.html',
  styleUrls: ['./notificaciones-pendientes.component.css']
})
export class NotificacionesPendientesComponent {
  warning = "Estas peticiones están siendo revisadas por el administrador.";
  notificacionesPendientes =[];
    notificacionPendiente:SensorNotificacion ={
      id:undefined,
      nombre :undefined,
      hayElementos : undefined,
      observacionUsuario:undefined,
      observacionAdmin:undefined,
      tipo:undefined,
      estado:undefined,
      leida:undefined,
      cambiado:undefined,
      nombreUsuario:undefined,
      aprobada:undefined
    } 
    APROBADA_LEIDA = 0;
    NO_APROBADA_LEIDA = 1;
    PENDIENTE_LEIDA = 2;
    APROBADA_NO_LEIDA = 3;
    NO_APROBADA_NO_LEIDA = 4;
    PENDIENTE_NO_LEIDA = 5;
    constructor(private notificacionService : NotificacionService) {}

    ngOnInit(): void {

        this.notificacionService.obtenerNotificaciones([this.PENDIENTE_LEIDA, this.PENDIENTE_NO_LEIDA])
        .subscribe(notificaciones => notificaciones.forEach(notificacion => {
            this.notificacionPendiente.id = notificacion.id;
            this.notificacionPendiente.nombre = notificacion.nombre;
            this.notificacionPendiente.tipo = (notificacion.tipo == "H" ? "Humedad DHT22": "Temperatura DHT22");
            this.notificacionPendiente.hayElementos = notificacion.hayElementos == "N" ? "Necesitará instalación": "Propia instalación";
            this.notificacionPendiente.observacionUsuario = notificacion.observacionUsuario;
            this.notificacionPendiente.observacionAdmin = notificacion.observacionAdmin;
            this.notificacionesPendientes.push(this.notificacionPendiente);
            this.notificacionPendiente ={
              id:undefined,
              nombre :undefined,
              hayElementos : undefined,
              observacionUsuario:undefined,
              observacionAdmin:undefined,
              tipo:undefined,
              estado:undefined,
              leida:undefined,
              cambiado:undefined,
              nombreUsuario:undefined,
              aprobada:undefined
            } 
            if(this.notificacionesPendientes.length == 0){
              this.warning = "No tiene peticiones pendientes por revisar."
            }
        }))

        
      }
      actualizarObservacion(){}

      admin(): Boolean {
        return localStorage.getItem('rol') == '0';
    }
}
