import {Component, OnInit} from '@angular/core';
import { Observer } from 'rxjs';
import {AccesoUsuario} from 'src/app/models/accesoUsuarioRequest';
import { Usuario } from 'src/app/models/usuario';
import {AlertService} from 'src/app/services/alert.service';
import { NotificacionService } from 'src/app/services/notificaciones.service';
import {UsuariosService} from 'src/app/services/usuarios.service';

@Component({
    selector: 'app-usuarios-login',
    templateUrl: './usuarios-login.component.html', 
    styleUrls: ['./usuarios-login.component.css']
})
export class UsuariosLoginComponent implements OnInit {
    username : string;
    password : string;
    usuario : Usuario;
    
    APROBADA_NO_LEIDA = 3;
    NO_APROBADA_NO_LEIDA = 4;
    PENDIENTE_NO_LEIDA = 5;
    // Se inicializa ya que sino daria error de undefined en los campos
    accesoUsuario : AccesoUsuario = {
        username: undefined,
        password: undefined,
        grand_type: undefined,
        client_id: undefined,
        client_secret: undefined
    };
    constructor(private service : UsuariosService, public alertService : AlertService, private notificacionService : NotificacionService) {}

    ngOnInit(): void {}

    observerLogIn: Observer<any> = {
        next: (token: any) => {
          localStorage.setItem('token', token.access_token);
          this.alertService.setPopUp(true, "HA ACCEDIDO CORRECTAMENTE", "Ir a la página principal");
          this.notificacionService.obtenerNotificaciones([this.NO_APROBADA_NO_LEIDA, this.APROBADA_NO_LEIDA])
          .subscribe(notificaciones => 
            localStorage.setItem('numNotificaciones', notificaciones.length.toString())
            )
            this.notificacionService.obtenerNotificaciones([this.PENDIENTE_NO_LEIDA])
          .subscribe(notificaciones => 
            localStorage.setItem('numNotificacionesPendientes', notificaciones.length.toString())
            )
        },
        error: (error: any) => {
          if (error.status === 500) {
            this.alertService.setAlert(true, error.error.message);
          } else if (error.status == 400) {
            this.alertService.setAlert(true, "Contraseña o usuario incorrecto");
          } else {
            if (error.error.message == null) {
              error.error.message = "Error desconocido. Fallo de conexión";
            }
            this.alertService.setAlert(true, error.error.message);
          }
        },
        complete: () => {
          //nada
        }
    };

    login() {
        this.alertService.limpiarAlert();
        console.log(this.username);
        this.accesoUsuario.username = this.username;
        this.accesoUsuario.password = this.password;
        this.accesoUsuario.grand_type = "password";
        this.accesoUsuario.client_id = "client-id";
        this.accesoUsuario.client_secret = "client-secret";

        this.service.login(this.accesoUsuario).subscribe(this.observerLogIn);
    }
}
