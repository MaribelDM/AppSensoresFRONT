import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnChanges {

  @Output() valueChange = new EventEmitter();
  fechaIn1 = '';
  fechaIn2 = '';

  constructor(public alertService: AlertService) { 
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onButtonClick(fechaIn1 : string, fechaIn2: string){
    this.alertService.setAlert(false, "");
    console.log(fechaIn1 + ', ' + fechaIn2);
    this.valueChange.emit(fechaIn1 + ', ' + fechaIn2);
  }
}
