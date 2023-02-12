import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnChanges {

  @Output()
  valueChange = new EventEmitter();
  fechaIn1 = '';
  fechaIn2 = '';

  constructor() { 
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onButtonClick(fechaIn1 : string, fechaIn2: string){
    console.log(fechaIn1 + ', ' + fechaIn2);
    this.valueChange.emit(fechaIn1 + ', ' + fechaIn2);
  }


  // https://v7.material.angular.io/components/datepicker/overview

}
