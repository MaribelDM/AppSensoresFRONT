import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  numNotificaciones = localStorage.getItem('numNotificaciones');
  numNotificacionesPendientes = localStorage.getItem('numNotificacionesPendientes');
  constructor(public alertService:AlertService, private usuarioService:UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }

  sesion():Boolean{
    return this.usuarioService.haySesion();
  }

  cerrarSesion(){
    this.router.navigate[("/home")];
    localStorage.clear();
    this.alertService.setPopUp(true, "HA SALIDO CORRECTAMENTE DE SU SESIÓN", "Cerrar");
  }

  admin(): Boolean {
    return localStorage.getItem('rol') == '0';
  }

}
