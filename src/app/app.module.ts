import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HumedadesComponent } from './components/humedades/humedades.component';
import { TemperaturasComponent } from './components/temperaturas/temperaturas.component';
import { LayoutModule } from './layout/layout.module';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { MaterialModule } from './material/material.module';
import { EstadisticasHumedadComponent } from './components/estadisticas-humedad/estadisticas-humedad.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HumedadesComponent,
    TemperaturasComponent,
    UsuariosComponent,
    EstadisticasHumedadComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  exports:[
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
