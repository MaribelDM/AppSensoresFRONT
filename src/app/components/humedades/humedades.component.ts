import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Humedad } from 'src/app/models/humedad';
import {HumedadesService} from 'src/app/services/humedades.service';
import { Chart, registerables} from 'chart.js';
import 'chartjs-adapter-moment'
@Component({
  selector: 'app-humedades',
  templateUrl: './humedades.component.html',
  styleUrls: ['./humedades.component.css']
})
export class HumedadesComponent implements OnInit {

  
  titulo = 'Tabla humedades'
  humedades:Humedad[];
  humedadActual = new Humedad();
  valores = [];
  fechas =[];
 
  chart : any = [];
  constructor(private service: HumedadesService) {
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
