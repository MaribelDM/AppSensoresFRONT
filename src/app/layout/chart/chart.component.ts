import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  intervaloRecarga : any = null;
  chart: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.chart = new Chart('graficaTR', {
      type: 'line', 
      data:{
        labels: [],
        datasets: [
          {
          label: 'Data',
          fill: false,
          data: [],
          backgroundColor: '#168ede',
					borderColor: '#168ede'
          }
        ]
      },
      options: {
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
      }
    )
  }
}


