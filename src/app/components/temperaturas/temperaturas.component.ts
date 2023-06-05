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
  fechas = [];
  chart : any = [];
  fechasElegidas : String;

  startDate: String;

  endDate : string;

  constructor(private service: TemperaturasService) { 
    Chart.register(...registerables);
  }

  recibirMensaje(fechasElegidas : String){
    this.displayCounter(fechasElegidas);
  }

  //"2022-01-01 00:00:00", "2022-05-08 00:00:00"
  ngOnInit(): void {
    
    this.grafica();
    /*this.service.temperaturaFecha("2022-01-01 00:00:00", "2022-05-08 00:00:00").subscribe(temperaturas => {this.temperaturas = temperaturas;
      this.temperaturas.forEach((temperatura) =>{
        this.valores.push(temperatura.valor);
        this.fechas.push(new Date(temperatura.fecha));
      });
    });*/
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
  
    private grafica():Chart{
      return this.chart = new Chart('canvas2', {  
        type: 'line',  
        data: {  
          labels: this.fechas,  
  
          datasets: [  
            {  
              label: 'Línea promedio',
              data: this.valores,  
              borderColor: '#38b498',  
              backgroundColor: "#38b498",  
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
                    text: 'Temperatura (ºC)'
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
