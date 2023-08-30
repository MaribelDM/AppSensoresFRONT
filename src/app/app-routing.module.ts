import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HumedadesComponent } from './components/humedades/humedades.component';
import { TemperaturasComponent } from './components/temperaturas/temperaturas.component';
import { UsuariosLoginComponent } from './components/usuarios-login/usuarios-login.component';
import { UsuarioRegistroComponent } from './components/usuario-registro/usuario-registro.component';
import { HomeComponent } from './components/home/home.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { UsuarioCambioContraseniaComponent } from './components/usuario-cambio-contrasenia/usuario-cambio-contrasenia.component';
import { GestionSensoresComponent } from './components/gestion-sensores/gestion-sensores.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { NotificacionesPendientesComponent } from './components/notificaciones-pendientes/notificaciones-pendientes.component';

const routes: Routes = [
  {path: 'humedades', component: HumedadesComponent},
  {path: 'temperaturas', component: TemperaturasComponent}, 
  {path: 'sesion', component:UsuariosLoginComponent},
  {path: 'registro', component:UsuarioRegistroComponent},
  {path: 'home', component:HomeComponent},
  {path: 'info', component:MiCuentaComponent},
  {path: 'cambio-pass' , component:UsuarioCambioContraseniaComponent},
  {path: 'nuevo-sensor', component: GestionSensoresComponent},
  {path: 'notificaciones', component : NotificacionesComponent},
  {path: 'notificaciones-pendientes', component : NotificacionesPendientesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
