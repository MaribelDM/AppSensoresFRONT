import { estadisticasHumedad } from "./estadisticas-humedad";
import { ValoresSensores } from "./valoresSensores";

export class Sensor {

    nombre: string;
    valores : ValoresSensores[] ;
    estadisticas: estadisticasHumedad;
    mensaje:string;
}
