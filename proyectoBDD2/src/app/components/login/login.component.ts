import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports:[CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  login() {
    if (this.email && this.password) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      // Aquí puedes agregar la lógica para autenticar al usuario
    } else {
      console.log('Please enter both email and password');
    }
  }
}
