import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Humedad} from 'src/app/models/humedad';
import {HumedadesService} from 'src/app/services/humedades.service';
import {Chart, registerables} from 'chart.js';
import 'chartjs-adapter-moment'
import {estadisticasHumedad} from 'src/app/models/estadisticas-humedad';
import {AlertService} from 'src/app/services/alert.service';
import {HighchartsChartModule} from 'highcharts-angular';
import { Sensor } from 'src/app/models/sensor';
import { SensoresService } from 'src/app/services/sensores.service';
@Component({selector: 'app-humedades', templateUrl: './humedades.component.html', styleUrls: ['./humedades.component.css']})
export class HumedadesComponent implements OnInit {

    valor : number;
    titulo = 'Tabla humedades' ;
    humedades : Humedad[];
    sensores : Sensor[];
    humedadActual = new Humedad();
    usuario = [];
    valores = [];
    fechas = [];
    estadisticas : estadisticasHumedad[] ;
    chart : any = [];
    char2 : any[];
    //humedad : Humedad;
    sensoresHumedad = [];
    opcionElegida = "";
    constructor(private service : HumedadesService, public alertService : AlertService, public sensorService:SensoresService) {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.sensorService.getCombo(localStorage.getItem('id'), 'H').subscribe(combo => {
            combo.forEach(sensor => 
                this.sensoresHumedad.push(sensor.nombre))
            });
        this.service.listar(localStorage.getItem('id'), '').subscribe(humedad => {
                this.sensores = humedad.sensor;
                /*this.sensores.forEach((sensor) =>{
                    this.estadisticas.push(sensor.estadisticas);
                   // this.valor = sensor.estadisticas.valorActual;
                }
                )*/

    })
           /* this.humedades.forEach((humedad) => {
                this.usuario.push(humedad.usuario);
                humedad.sensor.forEach((sensor) =>{
                    this.sensores.push(sensor);
                })*/
                //this.fechas.push(new Date(humedad.fecha));
            
            /*this.service.actual().subscribe(humedad => {
                this.humedadActual = humedad;
                this.valor = humedad.valor;
            })

        });*/
        /*this.service.actual().subscribe(humedad => (this.humedad = humedad), (error) => {
            if (error.status === 500) {
                this.alertService.setAlert(true, error.error.message)
            } else if (error.status == 400) {
                this.alertService.setAlert(true, "Contraseña o usuario incorrecto")
            } else {
                if (error.error.message == null) {
                    error.error.message = "Error desconocido. Fallo de conexión"
                }
                this.alertService.setAlert(true, error.error.message)
            }
        });
        this.service.media().subscribe(estadisticas => (this.estadisticas = estadisticas));*/

    }

    opcionSeleccionada(){
        this.service.listar(localStorage.getItem('id'), this.opcionElegida).subscribe(humedad => {
            this.sensores = humedad.sensor;})
    }

    admin():Boolean{
        return false;
    }

}
