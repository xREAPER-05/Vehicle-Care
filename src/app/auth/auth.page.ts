import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonInput, IonIcon, CommonModule, FormsModule]
})
export class AuthPage implements OnInit {
  modo = 'login';
  usuario = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }

  limpiarCampos() {
    this.usuario = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  accionPrincipal() {
    if (this.modo === 'login') {
      this.login();
    }
    else {
      this.register();
    }
  }

  async login() {
    if (this.usuario.email.trim() === '') {
      await this.mostrarAlerta('Correo electrónico requerido', 'Por favor, ingrese su correo electrónico.');
      return;
    }
    if (this.usuario.password.trim() === '') {
      await this.mostrarAlerta('Contraseña requerida', 'Por favor, ingrese su contraseña.');
      return;
    }
  }

  async register() {
    if (this.usuario.name.trim() === '' ) {
      await this.mostrarAlerta('Nombre requerido', 'Por favor, ingrese su nombre completo.');
      return;
    }
    if (this.usuario.email.trim() === '') {
      await this.mostrarAlerta('Correo electrónico requerido', 'Por favor, ingrese su correo electrónico.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.usuario.email)) {
      await this.mostrarAlerta('Correo invalido', 'Por favor, ingrese un correo valido.');
      return;
    }
    if (this.usuario.password.trim() === '') {
      await this.mostrarAlerta('Contraseña requerida', 'Por favor, ingrese su contraseña.');
      return;
    }
    if (this.usuario.passwordConfirm.trim() === '') {
      await this.mostrarAlerta('Confirmación de contraseña requerida', 'Por favor, confirme su contraseña.');
      return;
    }
    if (this.usuario.password.length < 8) {
      await this.mostrarAlerta('Contraseña corta', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    } 
    if (this.usuario.password !== this.usuario.passwordConfirm) {
      await this.mostrarAlerta('Contraseñas no coinciden', 'Por favor, asegúrese de que las contraseñas coincidan.');
      return;
    }
    await this.mostrarAlerta('Registro exitoso', '¡Bienvenido, ' + this.usuario.name + '! Su cuenta ha sido creada exitosamente.');
    this.limpiarCampos();
  }
  
  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

}
