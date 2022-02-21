import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasHumedadComponent } from './components/estadisticas-humedad/estadisticas-humedad.component';
import { HumedadesComponent } from './components/humedades/humedades.component';
import { TemperaturasComponent } from './components/temperaturas/temperaturas.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {path: 'humedades', component: HumedadesComponent},
  {path: 'temperaturas', component: TemperaturasComponent}, 
  {path: 'estadisticasHumedad', component:EstadisticasHumedadComponent},
  {path: 'sesion', component:UsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
