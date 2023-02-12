import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Temperatura } from 'src/app/models/temperatura';
import { TemperaturasService } from 'src/app/services/temperaturas.service';
import 'chartjs-adapter-moment'
import { MatEndDate, MatStartDate } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-temperaturas',
  templateUrl: './temperaturas.component.html',
  styleUrls: ['./temperaturas.component.css']
})
export class TemperaturasComponent implements OnInit {

  temperaturas: Temperatura[];
  valores = [];
  fechas = []
  chart : any = [];
  valueChange: Observable<any>

  @Output()
  propagar = new EventEmitter<String>();

  startDate: String;

  endDate : string;

  constructor(private service: TemperaturasService) { 
    Chart.register(...registerables);
  }
  onPropagar() {
    this.propagar.emit(this.startDate);
  }
  //"2022-01-01 00:00:00", "2022-05-08 00:00:00"
  ngOnInit(): void {
    /*this.service.temperaturaFecha("2022-01-01 00:00:00", "2022-05-08 00:00:00").subscribe(temperaturas => {this.temperaturas = temperaturas;
      this.temperaturas.forEach((temperatura) =>{
        this.valores.push(temperatura.valor);
        this.fechas.push(new Date(temperatura.fecha));
      });
      this.grafica();
    });*/
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
                  text: 'Gráfica temperatura'
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
                    text: 'Temperatura'
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

    public displayCounter(count) {
      this.chart.destroy();
      count = count.replaceAll("T", " ");
      this.fechas = count.split(', ');
      if(this.fechas.length == 2){
        this.fechas[0] += ":00" ; 
        this.fechas[1] += ":00";
      }
      console.log(count);
      console.log(this.fechas);
      
      if(this.chart){
        this.chart.destroy();
      }

      this.service.temperaturaFecha(this.fechas[0], this.fechas[1] ).subscribe(temperaturas => {this.temperaturas = temperaturas;
        this.temperaturas.forEach((temperatura) =>{
          this.valores.push(temperatura.valor);
          this.fechas.push(new Date(temperatura.fecha));
        });
        
        this.grafica();
      });
    } 
}
