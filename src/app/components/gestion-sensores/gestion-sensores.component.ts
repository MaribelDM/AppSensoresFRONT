import { Component } from '@angular/core';
import { PeticionNotificacionRequest } from 'src/app/models/peticionNotificacionRequest';
import { NotificacionService } from 'src/app/services/notificaciones.service';
import { Observer } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-gestion-sensores',
  templateUrl: './gestion-sensores.component.html',
  styleUrls: ['./gestion-sensores.component.css']
})
export class GestionSensoresComponent {
  nombreSensor: string;
  infoSensor: string;
  hayElementos = "";
  tipoSensor = "";
  peticionNotificacionRequest : PeticionNotificacionRequest = {
    hayElementosSensor: undefined,
    idUsuario: undefined,
    nombreSensor: undefined,
    observaciones: undefined,
    tipoSensor: undefined
  };

  constructor(private notificacionService:NotificacionService, public alertService:AlertService){}

  observerRegistro: Observer<any> = {
    next: (token: any) => {
      this.alertService.setAlert(false, "");
      this.alertService.setPopUp(true, "SE HA REGISTRADO LA PETICION PARA AÑADIR UN SENSOR CORRECTAMENTE", "Ver en peticiones pendientes");
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
  registro(){
    this.peticionNotificacionRequest.hayElementosSensor = this.hayElementos;
    this.peticionNotificacionRequest.idUsuario = parseInt(localStorage.getItem("id"));
    this.peticionNotificacionRequest.nombreSensor = this.nombreSensor;
    this.peticionNotificacionRequest.observaciones = this.infoSensor;
    this.peticionNotificacionRequest.tipoSensor = this.tipoSensor;
    this.notificacionService.registro(this.peticionNotificacionRequest).subscribe(this.observerRegistro);
  }
}
