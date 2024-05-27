import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../services/student.service';
import { TeamService } from '../services/teamService';
import { Team } from '../models/team';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private studentService : StudentService , private teamService : TeamService) {}

  login() {
    console.log("prueba login")
    if (this.email && this.password) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      // Aquí puedes agregar la lógica para autenticar al usuario
    } else {
      console.log('Please enter both email and password');

      //preba de endpoints

      //this.getStudents()
     // this.findUserByCi(12345678) 
     //this.getTeams()
     this.getTeamById(1)
    }
  }
  findUserByCi(ci: number) {
    this.studentService.findUserByCi(ci).subscribe({
      next: (data) => {
        // Manejar la respuesta aquí
        console.log(data.ci)
      },
      error: (error) => {
        console.log('errorrrr')
        // Manejar errores si es necesario
      }
    });
  }

    getStudents() {
      this.studentService.getStudens().subscribe({
        next: (data) => {
          // Manejar la respuesta aquí
          console.log(data)
        },
        error: (error) => {
          console.log('errorrrr')
          // Manejar errores si es necesario
        }
      });
    }


      getTeams() {
        this.teamService.getTeams().subscribe({
          next: (data) => {
            // Manejar la respuesta aquí
            console.log(data)
          },
          error: (error) => {
            console.log('errorrrr')
            // Manejar errores si es necesario
          }
        });
}


getTeamById(id : number) {
  this.teamService.getTeamById(id).subscribe({
    next: (data) => {
      // Manejar la respuesta aquí
      console.log(data)
    },
    error: (error) => {
      console.log('errorrrr')
      // Manejar errores si es necesario
    }
  });
}
}
