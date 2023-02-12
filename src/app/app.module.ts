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

@NgModule({
  declarations: [
    AppComponent,
    HumedadesComponent,
    TemperaturasComponent,
    UsuariosLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule, 
    FormsModule 
  ],
  exports:[
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
