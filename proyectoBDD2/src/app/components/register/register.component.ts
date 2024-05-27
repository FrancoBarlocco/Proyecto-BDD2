import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone:true
})
export class RegisterComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  carrera: string = '';
  telefono: string = '';

  register() {
    // Aquí puedes implementar la lógica de registro
    console.log('Nombre:', this.nombre);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Carrera:', this.carrera);
    console.log('Teléfono:', this.telefono);
  }
}
