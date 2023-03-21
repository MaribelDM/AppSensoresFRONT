import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccesoUsuario } from 'src/app/models/accesoUsuarioRequest';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios-login',
  templateUrl: './usuarios-login.component.html',
  styleUrls: ['./usuarios-login.component.css']
})
export class UsuariosLoginComponent implements OnInit {
  username: string;
  password: string;
  //Se inicializa ya que sino daria error de undefined en los campos
  accesoUsuario:AccesoUsuario = {
    username: undefined,
    password : undefined,
    grand_type:undefined,
    client_id:undefined,
    client_secret:undefined
  };
  constructor(private service: UsuariosService) { 
    
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.username);
    this.accesoUsuario.username = this.username;
    this.accesoUsuario.password = this.password;
    this.accesoUsuario.grand_type  = "password";
    this.accesoUsuario.client_id = "client-id";
    this.accesoUsuario.client_secret = "client-secret"; 

    this.service.login(this.accesoUsuario).subscribe(token => {localStorage.setItem('token', token.access_token)});
    console.log(this.username);
    console.log(this.password);
  }

}
