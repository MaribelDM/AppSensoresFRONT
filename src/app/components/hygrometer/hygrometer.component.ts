import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';

HC_more(Highcharts); // init highcharts-more

@Component({selector: 'app-hygrometer', templateUrl: './hygrometer.component.html', styleUrls: ['./hygrometer.component.css']})export class HygrometerComponent implements OnInit {
    @Input() valorActual: number = 0;
    
    constructor(private cdr: ChangeDetectorRef) {}
    ngOnInit(): void {}

    ngOnChanges() {
        this.cdr.detectChanges();
      }

    Highcharts : typeof Highcharts = Highcharts;
 
    chartOptions : Highcharts.Options = {
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
                    from: 45.25,
                    to: 46.25,
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
                data: "[this.actualizarValor()]",
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
    
    actualizarValor() {
        // Actualizar el valor en la configuración de Highcharts
        const newData = [this.valorActual];
    
      }
}
