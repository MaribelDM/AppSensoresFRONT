import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  indicadorAlert = false;
  avisoAlert : string;
  indicadorPopUp = false;
  avisoPopUp : string;
  cierrePopUp: string;

  constructor() { }
  

  setAlert(value: boolean, aviso:string): void {
    this.indicadorAlert = value;
    this.avisoAlert = aviso;
  }

  setPopUp(value: boolean, aviso:string, cierrePopUp:string): void {
    this.indicadorPopUp = value;
    this.avisoPopUp = aviso;
    this.cierrePopUp = cierrePopUp;
  }

  getShowAlert(): boolean {
    return this.indicadorAlert;
  }

  getAvisoAlert(): string {
    return this.avisoAlert;
  }

  getPopUpIndicator(): boolean {
    return this.indicadorPopUp;
  }

  getAvisoPopUp(): string {
    return this.avisoPopUp;
  }

  getCierrePopUpPopUp(): string {
    return this.cierrePopUp;
  }

  limpiarAlert(){
    this.indicadorAlert = false;
  }
}
