import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HumedadesComponent } from './components/humedades/humedades.component';
import { TemperaturasComponent } from './components/temperaturas/temperaturas.component';

const routes: Routes = [
  {path: 'humedades', component: HumedadesComponent},
  {path: 'temperaturas', component: TemperaturasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
