import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Humedad} from 'src/app/models/humedad';
import {HumedadesService} from 'src/app/services/humedades.service';
import {Chart, registerables} from 'chart.js';
import 'chartjs-adapter-moment'
import {estadisticasHumedad} from 'src/app/models/estadisticas-humedad';
import {AlertService} from 'src/app/services/alert.service';
import {HighchartsChartModule} from 'highcharts-angular';
import {Sensor} from 'src/app/models/sensor';
import {SensoresService} from 'src/app/services/sensores.service';
import {UsuariosService} from 'src/app/services/usuarios.service';
@Component({selector: 'app-humedades', templateUrl: './humedades.component.html', styleUrls: ['./humedades.component.css']})
export class HumedadesComponent implements OnInit {

    humedades : Humedad[];
    sensores : Sensor[];
    humedadActual = new Humedad();
    chart : any = [];
    char2 : any[];
    // humedad : Humedad;
    sensoresHumedad = [];
    opcionElegida = "";
    opcionElegidaUsuario = "";
    usuarios = [];
    constructor(private service : HumedadesService, public alertService : AlertService, public sensorService : SensoresService, private usuarioService : UsuariosService) {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        if (!this.admin()) {
            this.sensorService.getCombo(localStorage.getItem('id'), 'H').subscribe(combo => {
                combo.forEach(sensor => this.sensoresHumedad.push(sensor.nombre))
            });
            this.service.listar(localStorage.getItem('id'), '').subscribe(humedad => {
                this.sensores = humedad.sensor;


            })
        }
        if (this.admin()) {
            this.usuarioService.getUsuarios().subscribe(usuarios => {
                this.usuarios = usuarios;
            });
        }
    }

    opcionSeleccionada() {
        if(this.admin()){
            this.service.listar(this.opcionElegidaUsuario, this.opcionElegida).subscribe(humedad => {
                this.sensores = humedad.sensor;
            })
        }else{
        this.service.listar(localStorage.getItem('id'), this.opcionElegida).subscribe(humedad => {
            this.sensores = humedad.sensor;
        })
        }
    }

    opcionSeleccionadaUsuario() {
        this.sensorService.getCombo(this.opcionElegidaUsuario, 'H').subscribe(combo => {
            combo.forEach(sensor => this.sensoresHumedad.push(sensor.nombre))
        });
    }

    admin(): Boolean {
        return localStorage.getItem('rol') == '0';
    }

    sesion():Boolean{
        return this.usuarioService.haySesion();
      }

}
