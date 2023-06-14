import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  mostrarPopUp : boolean;
  usuario : Usuario;
  constructor(public alertService: AlertService, private router: Router, private service : UsuariosService) { }

  ngOnInit(): void {
  }

  closeAlert(){
    if(this.alertService.getAvisoPopUp() == 'HA ACCEDIDO CORRECTAMENTE'){
      this.router.navigate(['/home']);
      this.service.getUsuario().subscribe(usuario => {
        this.usuario = usuario;
        localStorage.setItem('rol', usuario.role);
        localStorage.setItem('name', usuario.name);
        localStorage.setItem('id', usuario.id.toString());
    });
    }else if(this.alertService.getAvisoPopUp() == "USUARIO CREADO CORRECTAMENTE"){
      this.router.navigate(['/sesion']);
    }else if(this.alertService.getAvisoPopUp() == "NO HA INICIADO SESION"){
      this.router.navigate(['/sesion']);
    }else if(this.alertService.getAvisoPopUp()  == "HA SALIDO CORRECTAMENTE DE SU SESIÓN" ||
    this.alertService.getAvisoPopUp()  == "SU SESIÓN HA EXPIRADO"){
      this.router.navigate(['/home']);
      localStorage.clear();
    }else if(this.alertService.getAvisoPopUp()  == "Se eliminarán todos los datos asociados a su cuenta, ¿está seguro de darse de baja?"){
      this.router.navigate(['/info']);
    }
    this.alertService.setPopUp(false, "");
  }

  closeAlertRegistro(){
    this.router.navigate(['/registro']);
    
    this.alertService.setPopUp(false, "");
  }

  cerrarPopup(){
    this.alertService.setPopUp(false, "");
  }

  closeAlertBaja(){

  }
}
