import { Component, OnInit } from '@angular/core';
import { estadisticasTemperatura } from 'src/app/models/estadisticas-temperatura';
import { Temperatura } from 'src/app/models/temperatura';
import { TemperaturasService } from 'src/app/services/temperaturas.service';

@Component({
  selector: 'app-estadisticas-temperatura',
  templateUrl: './estadisticas-temperatura.component.html',
  styleUrls: ['./estadisticas-temperatura.component.css']
})
export class EstadisticasTemperaturaComponent implements OnInit {

  title = 'ESTADISTICAS ACTUALIZADAS PARA HUMEDAD';
  temperatura : Temperatura; 
  estadisticas = new estadisticasTemperatura();
  constructor(private service:TemperaturasService) { }

  ngOnInit(): void {

    this.service.actual().subscribe( temperatura => (this.temperatura = temperatura) );
    this.service.media().subscribe( estadisticas => (this.estadisticas = estadisticas) );
  }

}
