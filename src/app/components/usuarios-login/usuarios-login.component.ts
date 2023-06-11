import {Component, OnInit} from '@angular/core';
import { Observer } from 'rxjs';
import {AccesoUsuario} from 'src/app/models/accesoUsuarioRequest';
import { Usuario } from 'src/app/models/usuario';
import {AlertService} from 'src/app/services/alert.service';
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
    // Se inicializa ya que sino daria error de undefined en los campos
    accesoUsuario : AccesoUsuario = {
        username: undefined,
        password: undefined,
        grand_type: undefined,
        client_id: undefined,
        client_secret: undefined
    };
    constructor(private service : UsuariosService, public alertService : AlertService) {}

    ngOnInit(): void {}

    observer: Observer<any> = {
        next: (token: any) => {
          localStorage.setItem('token', token.access_token);
          this.alertService.setPopUp(true, "HA ACCEDIDO CORRECTAMENTE");
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

        this.service.login(this.accesoUsuario).subscribe(this.observer);
    }
}
