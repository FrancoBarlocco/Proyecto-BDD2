import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';
import LoginService from '../../services/login.service';
import { Router } from '@angular/router';
import { Student } from '../../models/student';

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


  /*  
  asi se obtiene el userId de un estudiante en cualqueir componente 
  
    userId: string | null = '';

    ngOnInit() {
    this.userId = localStorage.getItem('ci');

  }*/ 

  userIds: string | null = '';

  constructor(private loginService : LoginService,  private router: Router) { }

  login() {
      this.loginService.login(this.email, this.password).subscribe(
        response => {
          alert('Inicio de sesion exitoso')
          const userResponse = {
            Ci: response.Ci,
            FirstName: response.FirstName,
            LastName: response.LastName,
            Email: response.Email,
            Career: response.Career,
            ChampionTeamId: response.ChampionTeamId,
            SubChampionTeamId: response.SubChampionTeamId,
            Contact: response.Contact
        };
          this.loginService.setUser(userResponse);
          localStorage.setItem('userId', response.userId);
          //console.log(localStorage.getItem("user"));
          if(response.userType == 'admin') //es admin
          {
            this.router.navigate(['/insertMatch']);
          }
          else{ //es un usuario
            this.router.navigate(['/home']);
          }
          
        },
        error => {
          if (error.status === 401) {
            alert('Datos incorrectos');
          } else {
            alert('An error occurred during registration');
          }
        }
      );
  }

  logout() {
    localStorage.removeItem('userId');
  }

  goBack() {
    this.router.navigate(['']); // Reemplaza '/home' con la ruta a la que quieres que el usuario vuelva
  }
}


