import { Component, OnInit, Output } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Temperatura } from 'src/app/models/temperatura';
import { TemperaturasService } from 'src/app/services/temperaturas.service';
import 'chartjs-adapter-moment'
import { SensoresService } from 'src/app/services/sensores.service';
import { Sensor } from 'src/app/models/sensor';
import { AlertService } from 'src/app/services/alert.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-temperaturas',
  templateUrl: './temperaturas.component.html',
  styleUrls: ['./temperaturas.component.css']
})
export class TemperaturasComponent implements OnInit {

  temperaturas: Temperatura[];
  valores = [];
  fechas = [];
  fechasSalida = []
  chart : any = [];
  sensoresTemp = [];
  sensorTemp ={
    id:undefined,
    nombre:undefined
  }
  startDate: String;
  endDate : string;
  opcionElegida = "";
  opcionElegidaUsuario = "";
  sensores : Sensor[];
  usuarios = [];
  mensaje: string;
  nombreSensor:string;

  constructor(private service: TemperaturasService, private sensorService:SensoresService, public alertService:AlertService, private usuarioService:UsuariosService) { 
    Chart.register(...registerables);
  }

  recibirMensaje(fechasElegidas : String){
    this.displayCounter(fechasElegidas);
  }

  //"2022-01-01 00:00:00", "2022-05-08 00:00:00"
  ngOnInit(): void {
    if(!this.admin()){
    this.sensorService.getCombo(localStorage.getItem('id'), 'T').subscribe( (combo) => {
      combo.forEach(sensor => {
          this.sensorTemp.id = sensor.id;
          this.sensorTemp.nombre = sensor.nombre;
          this.sensoresTemp.push(sensor);
          this.sensorTemp ={
            id:undefined,
            nombre:undefined
          }
      })
      },
    (error) => {
      if(error.status == 401){
        this.alertService.setPopUp(true, "SU SESIÓN HA EXPIRADO", "Cerrar");
      }else if(error.status == 400){
        this.alertService.setAlert(true, error.message);
      }
    }
      
      );
  }
  if (this.admin()) {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
        this.usuarios = usuarios;
    });
}

    
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
          labels: this.fechasSalida,  
  
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
        this.valores = [];
        this.fechasSalida = [];
       
      }

     /*this.service.temperaturaFecha(this.fechas[0], this.fechas[1] ).subscribe(temperaturas => {this.temperaturas = temperaturas;
        this.temperaturas.forEach((temperatura) =>{
          this.valores.push(temperatura.valor);
          this.fechas.push(new Date(temperatura.fecha));
        });
        
        this.grafica();
      });*/

      this.service.listar(this.opcionElegida, this.fechas[0], this.fechas[1] ).subscribe((temperaturas) => {
        temperaturas.sensor.forEach((sensor) =>{
          /*if(sensor.valores.length == 0){
            
          }*/
          sensor.valores.forEach(valores => {
            this.valores.push(valores.valor);
            this.fechasSalida.push(new Date(valores.fecha));
          });
        } )
        this.nombreSensor = temperaturas.sensor[0].nombre;
        this.mensaje = temperaturas.sensor[0].mensaje;
        this.grafica();
      },
      (error) => {
        if(error.status == 401){
          this.alertService.setPopUp(true, "SU SESIÓN HA EXPIRADO", "Cerrar");
        }else if(error.status == 400){
          this.alertService.setAlert(true, error.error.message);
        }
      });
    } 
    

  admin():Boolean{
    return localStorage.getItem('rol') == '0';
  }

  opcionSeleccionada(){
    //llamar al servicio que sea
  }

  opcionSeleccionadaUsuario() {
    this.sensoresTemp = [];
    this.sensorService.getCombo(this.opcionElegidaUsuario, 'T').subscribe( (combo) => {
      combo.forEach(sensor => {
        this.sensorTemp.id = sensor.id;
        this.sensorTemp.nombre = sensor.nombre;
        this.sensoresTemp.push(sensor);
        this.sensorTemp ={
          id:undefined,
          nombre:undefined
        }
      })
      },
    (error) => {
      if(error.status == 401){
        this.alertService.setPopUp(true, "SU SESIÓN HA EXPIRADO", "Cerrar");
      }else if(error.status == 400){
        this.alertService.setAlert(true, error.message);
      }
    }
      
      );
}
}
