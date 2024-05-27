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
  }
}
