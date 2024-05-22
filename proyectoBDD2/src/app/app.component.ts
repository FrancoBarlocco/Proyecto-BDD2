import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component'; // Asegúrate de ajustar la ruta según tu estructura de archivos

@Component({
  selector: 'app-root',
  template: '<app-login></app-login>',
  standalone: true,
  imports: [CommonModule, LoginComponent]
})
export class AppComponent {}
