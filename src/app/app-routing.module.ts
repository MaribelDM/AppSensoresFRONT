import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasHumedadComponent } from './components/estadisticas-humedad/estadisticas-humedad.component';
import { EstadisticasTemperaturaComponent } from './components/estadisticas-temperatura/estadisticas-temperatura.component';
import { HumedadesComponent } from './components/humedades/humedades.component';
import { TemperaturasComponent } from './components/temperaturas/temperaturas.component';
import { UsuariosLoginComponent } from './components/usuarios-login/usuarios-login.component';

const routes: Routes = [
  {path: 'humedades', component: HumedadesComponent},
  {path: 'estadisticasHumedad', component:EstadisticasHumedadComponent},
  {path: 'temperaturas', component: TemperaturasComponent}, 
  {path: 'estadisticasTemperatura', component:EstadisticasTemperaturaComponent},
  {path: 'sesion', component:UsuariosLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
