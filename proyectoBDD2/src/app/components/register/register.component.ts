import { Component } from '@angular/core';
import RegisterService from '../../services/register.service';
import internal from 'node:stream';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule],
  standalone:true
})


export class RegisterComponent {
  constructor(private registerService: RegisterService) { }
  ci : string = '';
  firstName: string = '';
  lastName : string = ''
  email: string = '';
  password: string = '';
  career: string = '';
  championTeamId: string = '';
  subChampionTeamId: string = '';
  contact: string = '';

  register() {

    this.registerService.register(this.ci, this.firstName, this.lastName, this.email, this.password, this.career, this.championTeamId, this.subChampionTeamId, this.contact).subscribe(
      response => {
        alert('Registrado correctamente!')
        console.log('Registrado correctamente!', response);
      },
      error => {
        if (error.status === 401) {
          alert('El usuario ya está registrado!');
        } else {
          alert('An error occurred during registration');
        }
      }
    );
  

  }
}

