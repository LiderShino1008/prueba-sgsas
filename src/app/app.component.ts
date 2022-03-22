import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Declaraciones
  title = 'canal-masivo';
  visible = true;
  // backendHost: String = '';
  
  // Clientes temporales
  personas: any = [];
  // Resultados (clientes con ID)
  results: any = [];

  // Cliente temporal
  sujeto: any = {
    telefono: '',
    mensaje: '',
    gestion: '',
    consumo: '',
    pagar: ''
  };

  formulario = new FormGroup({
    telefono: new FormControl('', Validators.required),
    mensaje: new FormControl('Se ha realizado la facturación del mes de marzo para su clave {v1} , su consumo es de {v2} kWh el monto a pagar es de Lps {v3} fecha máxima de pago {v4}.', Validators.required)
  });

  // Getters
  get telefono(): any {
    return this.formulario.get('telefono');
  }
  get mensaje(): any {
    return this.formulario.get('mensaje');
  }

  // constructor() {}

  verNotificacion(): void {
    this.visible = false;
    console.log('Área visible: tabla de resultados');
  }

  verSeguimiento(): void {
    this.visible = true;
    console.log('Área visible: seguimiento de clientes');
  }

  generarFecha(): void {
    let ff = Date.now() + 15;
    console.log('Fecha máxima de pago: ', ff);
  }

  guardarTelefono(): void {
    console.log('Guardar cliente en arreglo temporal "personas"');
    if (this.formulario.valid) {
      this.sujeto.telefono = this.formulario.get('telefono');
      this.sujeto.clave = this.randomNumber(1000, 9999);
      
      if (this.formulario.get("mensaje") != null) {
        let m = this.formulario.get("mensaje")?.value;
        let msj = '';
        if (m.includes("{v3}")) {
          // V2 == CONSUMO
          this.sujeto.consumo = this.randomNumber(100, 999);
          this.sujeto.pagar = (this.sujeto.consumo<=150) ? this.sujeto.consumo*2 : this.sujeto.consumo*6;
          msj = m.replace(/{v1}/gi, this.sujeto.clave).replace(/{v2}/gi, this.sujeto.consumo).replace(/{v3}/gi, this.sujeto.pagar).replace(/{v4}/gi, (Date.now()+15) );
        } else {
          // V2 == GESTION
          this.sujeto.gestion = this.randomNumber(100000, 999999);
          msj = m.replace(/{v1}/gi, this.sujeto.clave).replace(/{v2}/gi, this.sujeto.gestion);
        }
        this.sujeto.mensaje = msj;
      }
      console.log('Elemento a guardar tmp: ', this.sujeto);
      this.personas.push(this.sujeto);
      // Limpiar propiedades
      this.sujeto = {
        telefono: '',
        mensaje: '',
        gestion: '',
        consumo: '',
        pagar: ''
      };
    } else {
      alert('Formulario incompleto: hay campos vacíos');
    }
  }

  enviarMensaje(): void {
    console.log('Enviar mensajes. Generar IDs y mostrar tabla de resultados');
    for (let j = 0; j < this.personas.length; j++) {
      const psa = this.personas[j];
      psa.id = this.randomAlphanumeric(8) + this.randomAlphanumeric(4) + this.randomAlphanumeric(4) + this.randomAlphanumeric(4) + this.randomAlphanumeric(12);
      this.results.push(psa);
    }
    this.verNotificacion();
  }

  randomNumber(maximum: number, minimum: number) {
    let min = Math.ceil(minimum);
    let max = Math.floor(maximum);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomAlphanumeric(longitud: number) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let cLength = characters.length;
    for (let i = 0; i < longitud; i++) {
      result += characters.charAt(Math.floor(Math.random() * cLength));
    }
    return result;
  }
}
