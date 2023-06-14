import {
    Component
}
from '@angular/core';
import {
    Router
}
from '@angular/router';
import {
    AlertService
}
from 'src/app/services/alert.service';
import { SensoresService } from 'src/app/services/sensores.service';
import {
    UsuariosService
}
from 'src/app/services/usuarios.service';

@Component({ selector: 'app-mi-cuenta', templateUrl: './mi-cuenta.component.html', styleUrls: ['./mi-cuenta.component.css'] }) export class MiCuentaComponent {

    constructor(public router : Router, public alertService:AlertService, private sensorService:SensoresService) {}


    nombre = localStorage.getItem('name');
    id = localStorage.getItem('id');
    sensoresHumedad = '';
    sensoresTemp = '' ;

    ngOnInit(): void {
        this.sensorService.getCombo(this.id, 'H').subscribe(combo => {
            combo.forEach(sensor => 
                this.sensoresHumedad = this.sensoresHumedad.concat(" ").concat(sensor.nombre))
            });
       this.sensorService.getCombo(this.id, 'T').subscribe(combo => {
            combo.forEach(sensor => 
                this.sensoresTemp = this.sensoresTemp + " " + sensor.nombre)
            });
    }

    cambioPass() {
        this.router.navigate(["/cambio-pass"]);
    }

    borrarCuenta() {
        this.alertService.setPopUp(true, "Se eliminarán todos los datos asociados a su cuenta, ¿está seguro de darse de baja?");
    }
}