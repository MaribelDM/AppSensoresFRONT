import { Component, OnInit } from '@angular/core';
import { estadisticasHumedad } from 'src/app/models/estadisticas-humedad';
import { Humedad } from '../../models/humedad';
import { HumedadesService } from '../../services/humedades.service';

@Component({
  selector: 'app-estadisticas-humedad',
  templateUrl: './estadisticas-humedad.component.html',
  styleUrls: ['./estadisticas-humedad.component.css']
  
})
export class EstadisticasHumedadComponent implements OnInit {

  title = 'ESTADISTICAS ACTUALIZADAS PARA HUMEDAD';
  humedad : Humedad; 
  estadisticas : estadisticasHumedad;
  constructor(private service:HumedadesService) { }

  ngOnInit(): void {

    this.service.actual().subscribe( humedad => (this.humedad = humedad) );
    this.service.media().subscribe( estadisticas => (this.estadisticas = estadisticas) );
  }

}
