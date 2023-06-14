import { Component } from '@angular/core';
import { Observer } from 'rxjs';
import { NuevaContraseñaRequest } from 'src/app/models/nuevaContraseñaRequest';
import { RegistroUsuario } from 'src/app/models/registroUsuarioRequest';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario-cambio-contrasenia',
  templateUrl: './usuario-cambio-contrasenia.component.html',
  styleUrls: ['./usuario-cambio-contrasenia.component.css']
})
export class UsuarioCambioContraseniaComponent {

  nuevaContrasenia: string;
  verificacionNuevaContrasenia: string;
  error = {
    status: undefined,
    message: undefined

  }
  constructor(private service: UsuariosService, private alertService:AlertService) { }
//Se inicializa ya que sino daria error de undefined en los campos
nuevaContraseñaRequest:NuevaContraseñaRequest = {
  nombreUsuario: undefined,
  nuevaContraseña: undefined,
  verificacionNuevaContraseña:undefined
};
  ngOnInit(): void {
  }

  observer: Observer<any> = {
    next: (token: any) => {},
    error: (error: any) => {
      if(error.status == 500){
       this.showAlert(error.error.message);
      }else{
        this.showAlert("Fallo en el sistema")
      }
    },
    complete: () => {
      //nada
    }
};

  validarContrasenias() {
    this.alertService.limpiarAlert();
    this.nuevaContraseñaRequest.nombreUsuario = localStorage.getItem('name');
    this.nuevaContraseñaRequest.nuevaContraseña = this.nuevaContrasenia;
    this.nuevaContraseñaRequest.verificacionNuevaContraseña = this.verificacionNuevaContrasenia;
    this.service.actualizarContraseña(this.nuevaContraseñaRequest).subscribe(this.observer);
    };
  

  showAlert(mensaje: string): void {
    this.alertService.setAlert(true, mensaje);
  }
  showPopUp(mensaje: string): void {
    this.alertService.setPopUp(true, mensaje, "Cerrar");
  }
}
