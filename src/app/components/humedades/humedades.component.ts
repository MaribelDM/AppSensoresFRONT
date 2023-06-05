import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Humedad } from 'src/app/models/humedad';
import {HumedadesService} from 'src/app/services/humedades.service';
import { Chart, registerables} from 'chart.js';
import 'chartjs-adapter-moment'
import { estadisticasHumedad } from 'src/app/models/estadisticas-humedad';
import { AlertService } from 'src/app/services/alert.service';
import { HighchartsChartModule } from 'highcharts-angular';
@Component({
  selector: 'app-humedades',
  templateUrl: './humedades.component.html',
  styleUrls: ['./humedades.component.css']
})
export class HumedadesComponent implements OnInit {

  valor: number = 44;
  titulo = 'Tabla humedades'
  humedades:Humedad[];
  humedadActual = new Humedad();
  valores = [];
  fechas =[];
  estadisticas = new estadisticasHumedad();
  chart : any = [];
  char2 : any[];
  humedad : Humedad; 
  constructor(private service: HumedadesService, public alertService:AlertService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.service.listar().subscribe(humedades => {this.humedades = humedades;
      this.humedades.forEach((humedad)=>{
        this.valores.push(humedad.valor);
        this.fechas.push(new Date(humedad.fecha));
      })
   this.service.actual().subscribe(humedad => {this.humedadActual = humedad;})
      this.grafica();
     });
     this.service.actual().subscribe( humedad => (this.humedad = humedad),
     (error) => {
       if(error.status === 500){
        this.alertService.setAlert(true, error.error.message)
       }else if(error.status == 400){
         this.alertService.setAlert(true,"Contraseña o usuario incorrecto")
       }else{
         if(error.error.message == null){
           error.error.message = "Error desconocido. Fallo de conexión"
         }
         this.alertService.setAlert(true,error.error.message)
       }
     } );
    this.service.media().subscribe( estadisticas => (this.estadisticas = estadisticas) );
    
  }

  private grafica():Chart{
    return this.chart = new Chart('canvas', {  
      type: 'line',  
      data: {  
        labels: this.fechas,  

        datasets: [  
          {  
            data: this.valores,  
            borderColor: '#3cb371',  
            backgroundColor: "#0000FF",  
          }  
        ]  
      },
      options: {
        plugins: {
            title: {
                display: true,
                text: 'Gráfica humedad'
            }
        },
        scales: {
            x: {
                type: 'time',
                position: 'bottom',
                time:{
                  unit: 'second'
                }
            },
            y: {
                type: 'linear',
                display: true,
                title:{
                  display: true,
                  text: 'Humedad'
                }, 
                ticks: {
                  major: {
                    enabled: true
                  }
                }
            }
        }
    }

    });
  }

 
  
  
}
