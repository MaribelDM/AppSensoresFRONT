import { Component, OnInit } from '@angular/core';
import { RegistroUsuario } from 'src/app/models/registroUsuarioRequest';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css']
})
export class UsuarioRegistroComponent implements OnInit {
  username: string;
  password: string;
  passwordVerification:string
  aviso:string;
  respuesta;
  error = {
    status: undefined,
    message: undefined

  }
  constructor(private service: UsuariosService, private alertService:AlertService) { }
//Se inicializa ya que sino daria error de undefined en los campos
registroUsuario:RegistroUsuario = {
  username: undefined,
  password : undefined,
  enabled:undefined,
  role:undefined,
  name:undefined,
  passwordVerification:undefined
};
  ngOnInit(): void {
  }

  crearCuenta() {
    this.alertService.limpiarAlert();
    console.log(this.username);
    this.registroUsuario.username = this.username;
    this.registroUsuario.name = this.username;
    this.registroUsuario.enabled  = true;
    this.registroUsuario.role = "USER";
    this.registroUsuario.password = this.password; 
    this.registroUsuario.passwordVerification = this.passwordVerification;

     this.service.registro(this.registroUsuario).subscribe(
      (respuesta) => {
        this.respuesta = respuesta
        this.showPopUp("USUARIO CREADO CORRECTAMENTE");
      },
      (error) => {
        if(error.status === 500){
         this.showAlert(error.error.message)
        }
      }
    );
  }

  showAlert(mensaje: string): void {
    this.alertService.setAlert(true, mensaje);
  }
  showPopUp(mensaje: string): void {
    this.alertService.setPopUp(true, mensaje);
  }
}
