import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HumedadesComponent } from './components/humedades/humedades.component';
import { TemperaturasComponent } from './components/temperaturas/temperaturas.component';
import { LayoutModule } from './layout/layout.module';
import { MaterialModule } from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosLoginComponent } from './components/usuarios-login/usuarios-login.component';
import { BackgroundComponent } from './components/background/background.component';
import { UsuarioRegistroComponent } from './components/usuario-registro/usuario-registro.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { HomeComponent } from './components/home/home.component';
import { HygrometerComponent } from './components/hygrometer/hygrometer.component';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { UsuariosService } from './services/usuarios.service';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { UsuarioCambioContraseniaComponent } from './components/usuario-cambio-contrasenia/usuario-cambio-contrasenia.component';


@NgModule({
  declarations: [
    AppComponent,
    HumedadesComponent,
    TemperaturasComponent,
    BackgroundComponent,
    UsuariosLoginComponent,
    UsuarioRegistroComponent,
    AlertComponent,
    PopUpComponent,
    HomeComponent,
    HygrometerComponent,
    MiCuentaComponent,
    UsuarioCambioContraseniaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule, 
    FormsModule ,
    HighchartsChartModule
  ],
  exports:[
    LayoutModule
  ],
  providers: [AlertService, UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
