import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public alertService:AlertService, private usuarioService:UsuariosService) { }

  ngOnInit(): void {
  }

  sesion():Boolean{
    return this.usuarioService.haySesion();
  }

   

}
