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
  backendHost: String = '';
  personas: any = [];
  sujeto: any = {
    telefono: '',
    mensaje: '',
    gestion: '',
    consumo: ''
  };

  formulario = new FormGroup({
    telefono: new FormControl('', Validators.required),
    mensaje: new FormControl('', Validators.required)
  });

  constructor() {}

  verNotificacion(): void {
    this.visible = false;
    console.log('Ahora muestra tabla results');
  }

  verSeguimiento(): void {
    this.visible = true;
    console.log('Ahora muestra seguimiento de mensajes');
  }

  generarFecha(): void {
    console.log('Generar nueva fecha');
    let ff = Date.now() + 15;
  }

  enviarMensaje(): void {
    console.log('Enviar mensajes');
    if (this.formulario.valid) {
      let mm = 'Se ha realizado la facturación del mes de marzo para su clave {v1} , su consumo es de {v2} kWh el monto a pagar es de Lps {v3} fecha máxima de pago {v4}.';
      this.sujeto.telefono = this.formulario.get('telefono');
      this.sujeto.mensaje = this.formulario.get('mensaje');
      this.sujeto.clave = this.randomNumber(1000, 9999);
      this.sujeto.gestion = this.randomNumber(100000, 999999);
      this.sujeto.consumo = this.randomNumber(100, 999);
    } else {
      alert('Formulario incompleto: hay campos vacíos');
    }
  }

  randomNumber(maximum: number, minimum: number) {
    let min = Math.ceil(minimum);
    let max = Math.floor(maximum);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
