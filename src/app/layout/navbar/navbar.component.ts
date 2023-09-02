import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { NotificacionService } from 'src/app/services/notificaciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  numNotificaciones = localStorage.getItem('numNotificaciones') ; 
  numNotificacionesPendientes = localStorage.getItem('numNotificacionesPendientes');
  APROBADA_NO_LEIDA = 3;
  NO_APROBADA_NO_LEIDA = 4;
  PENDIENTE_NO_LEIDA = 5;
  constructor(public alertService:AlertService, private usuarioService:UsuariosService, private router: Router , private notificacionService : NotificacionService) { }

  ngOnInit(): void {
    this.notificacionService.obtenerNotificaciones([this.NO_APROBADA_NO_LEIDA, this.APROBADA_NO_LEIDA])
    .subscribe(notificaciones => 
      localStorage.setItem('numNotificaciones', notificaciones.length.toString())
      )
      this.notificacionService.obtenerNotificaciones([this.PENDIENTE_NO_LEIDA])
    .subscribe(notificaciones => 
      localStorage.setItem('numNotificacionesPendientes', notificaciones.length.toString())
      )
    this.numNotificaciones = localStorage.getItem('numNotificaciones');
    this.numNotificacionesPendientes = localStorage.getItem('numNotificacionesPendientes');
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

  cargarNotificaciones(){
    this.notificacionService.obtenerNotificaciones([this.NO_APROBADA_NO_LEIDA, this.APROBADA_NO_LEIDA])
    .subscribe(notificaciones => 
      localStorage.setItem('numNotificaciones', notificaciones.length.toString())
      )
      this.notificacionService.obtenerNotificaciones([this.PENDIENTE_NO_LEIDA])
    .subscribe(notificaciones => 
      localStorage.setItem('numNotificacionesPendientes', notificaciones.length.toString())
      )
    this.numNotificaciones = localStorage.getItem('numNotificaciones');
    this.numNotificacionesPendientes = localStorage.getItem('numNotificacionesPendientes');
  }
}
