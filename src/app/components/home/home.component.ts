import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private usuarioService:UsuariosService, private alertService:AlertService,  private router: Router) { }

  ngOnInit(): void {
  }

  alertNoSesion(){
      this.alertService.setPopUp(true, 'NO HA INICIADO SESION', "Inice sesión");
  }

  sesion():Boolean{
    return this.usuarioService.haySesion();
  }
}
