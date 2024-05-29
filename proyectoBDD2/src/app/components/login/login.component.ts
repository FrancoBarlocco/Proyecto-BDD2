import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';

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

  constructor(private studentService: StudentService, private teamService: TeamService) { }

  login() {
    console.log("prueba login")
    if (this.email && this.password) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      // Aquí puedes agregar la lógica para autenticar al usuario
    } else {
      console.log('Please enter both email and password');

      //prueba de endpoints

      //this.getStudents()
      // this.findUserByCi(12345678) 
      //this.getTeams()
      //this.getTeamById(1)
    }
  }

  /*
  findUserByCi(ci: number) {
    this.studentService.findUserByCi(ci).then(data => {
      // Manejar la respuesta aquí
      console.log(data.ci);
    }).catch(error => {
      console.log('errorrrr');
      // Manejar errores si es necesario
    });
  }

  getStudents() {
    this.studentService.getStudents().then(data => {
      // Manejar la respuesta aquí
      console.log(data);
    }).catch(error => {
      console.log('errorrrr');
      // Manejar errores si es necesario
    });
  }

  getTeams() {
    this.teamService.getTeams().then(data => {
      // Manejar la respuesta aquí
      console.log(data);
    }).catch(error => {
      console.log('errorrrr');
      // Manejar errores si es necesario
    });
  }

  getTeamById(id: number) {
    this.teamService.getTeamById(id).then(data => {
      // Manejar la respuesta aquí
      console.log(data);
    }).catch(error => {
      console.log('errorrrr');
      // Manejar errores si es necesario
    });
  }

  */
}
