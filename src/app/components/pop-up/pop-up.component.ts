import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  mostrarPopUp : boolean;
  constructor(public alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
  }

  closeAlert(){
    if(this.alertService.getAvisoPopUp() == 'HA ACCEDIDO CORRECTAMENTE'){
      this.router.navigate(['/home']);
      // Navegar a la página actual nuevamente
      /*this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.router.url]);
      });*/
      //this.location.reload;
      
    }else if(this.alertService.getAvisoPopUp() == "USUARIO CREADO CORRECTAMENTE"){
      this.router.navigate(['/sesion']);
    }else if(this.alertService.getAvisoPopUp() == "NO HA INICIADO SESION"){
      this.router.navigate(['/sesion']);
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
}
