import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';

HC_more(Highcharts); // init highcharts-more

@Component({selector: 'app-hygrometer', templateUrl: './hygrometer.component.html', styleUrls: ['./hygrometer.component.css']})export class HygrometerComponent implements OnInit {
    @Input() valorActual: number = 0;
    chartOptions: any;
    a:any[];
    constructor(private cdr: ChangeDetectorRef) {}
    ngOnInit(): void {
        Highcharts.setOptions({
            plotOptions: {
                series: {
                    animation: {
                        duration: 0
                    },
                    
                }
            }
        });
       
        this.updateChartData([this.valorActual],this.a);
    }

    ngOnChanges() {
        this.cdr.detectChanges();
        this.updateChartData([this.valorActual],this.a);
      }

      Highcharts : typeof Highcharts = Highcharts;
      updateChartData(links: any[], nodes: any[]){
      this.chartOptions  = {
          chart: {
              type: 'gauge',
              backgroundColor: 'transparent'
          },
          credits: {
              enabled: false
          },
          title: {
              text: '',
              style: {
                  'font-family': 'Arial, sans-serif',
                  'font-size': '36px'
              }
          },
          pane: {
              center: [
                  '25%', '40%'
              ],
              size: '80%',
              startAngle: -90,
              endAngle: 90,
              background: [
                  {
                      backgroundColor: '#EEE',
                      innerRadius: '60%',
                      outerRadius: '100%',
                      shape: 'arc'
                  }
              ]
          },
          // the value axis
          yAxis: {
              stops: [
                  [
                      0.1, '#55BF3B'
                  ], // green
                  [
                      0.5, '#DDDF0D'
                  ], // yellow
                  
              ],
              plotBands: [
                  {
                      from: 0,
                      to: 40,
                      color: '#bbad50', // amarillo
                      thickness: 70
                  }, {
                      from: 40,
                      to: 60,
                      color: '#38b498', // verde
                      thickness: 70
                  }
                  , {
                      from: 60,
                      to: 100,
                      color: '#eda67e', // rojo
                      thickness: 70
                  }
                  , {
                      from: links[0] - 0.25 ,
                      to: links[0] + 0.25,
                      color: '#000000', // seleccion
                      thickness: 150
                  }
              ],
              lineWidth: 0,
              tickWidth: 0,
              minorTickInterval: null,
              tickAmount: 2,
              title: {
                  y: -70
              },
              labels: {
                  y: 16
              },
              min: 0,
              max: 100
          },
          exporting: {
              enabled: false
          },
          tooltip: {
              enabled: false
          },
          plotOptions: {
              solidgauge: {
                  dataLabels: {
                      y: 5,
                      borderWidth: 0,
                      useHTML: true
                  }
              }
          },
          series: [
              {
                  name: 'Humedad ambiente',
                  data: links,
                  dial: null,
                  pivot: null,
                  dataLabels: {
                      format: '<div style="text-align:center">' + '<span style="font-size:25px" class = "text-center">{y}%</span><br/>' + '<span style="font-size:12px;opacity:0.4">Humedad ambiente</span>' + '</div>'
                  },
                  tooltip: {
                      valueSuffix: ' %'
                  }
              }
          ] as any
      };
    }
    
    
      actualizarValor(): number {
        if (this.chartOptions.series && this.chartOptions.series.length > 0) {
          const newData = [this.valorActual];
          this.chartOptions.series[0].data = newData;
          // Actualizar la gráfica
          this.cdr.detectChanges();
        }
        return this.valorActual;
      }
}
