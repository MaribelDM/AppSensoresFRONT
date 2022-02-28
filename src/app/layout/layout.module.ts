import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { DatepickerComponent } from './datepicker/datepicker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    NavbarComponent,
    DatepickerComponent
  ],
  exports:[NavbarComponent,
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class LayoutModule { }
