import {HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccesoUsuario} from 'src/app/models/accesoUsuarioRequest';
import {Rol} from 'src/app/models/rol';
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
    roles : Rol[];
    rol : Rol;
    // Se inicializa ya que sino daria error de undefined en los campos
    accesoUsuario : AccesoUsuario = {
        username: undefined,
        password: undefined,
        grand_type: undefined,
        client_id: undefined,
        client_secret: undefined
    };
    constructor(private service : UsuariosService, public alertService : AlertService, public router : Router) {}

    ngOnInit(): void {}

    login() {
        this.alertService.limpiarAlert();
        console.log(this.username);
        this.accesoUsuario.username = this.username;
        this.accesoUsuario.password = this.password;
        this.accesoUsuario.grand_type = "password";
        this.accesoUsuario.client_id = "client-id";
        this.accesoUsuario.client_secret = "client-secret";

        this.service.login(this.accesoUsuario).subscribe(token => {
            localStorage.setItem('token', token.access_token)
            this.alertService.setPopUp(true, "HA ACCEDIDO CORRECTAMENTE");
        }, (error) => {
            if (error.status === 500) {
                this.alertService.setAlert(true, error.error.message)
            } else if (error.status == 400) {
                this.alertService.setAlert(true, "Contraseña o usuario incorrecto")
            } else {
                if (error.error.message == null) {
                    error.error.message = "Error desconocido. Fallo de conexión"
                }
                this.alertService.setAlert(true, error.error.message)
            }
        });
        this.service.getRol().subscribe(rol => {
            this.roles = rol;
            rol.forEach((rol) => {
                localStorage.setItem('role', rol.rol);
            });

        });
    }

    /*showAlert(mensaje: string): void {
    this.alertService.setAlert(true, mensaje);
  }

  showPopUp(mensaje: string): void {
    this.alertService.setPopUp(true, mensaje);
  }*/
}
