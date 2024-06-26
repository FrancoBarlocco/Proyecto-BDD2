import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import LoginService from '../../services/login.service';
import { Router } from '@angular/router';

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

  userIds: string | null = '';

  constructor(private loginService: LoginService, private router: Router) { }

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
        if (response.userType == 'admin') //es admin
        {
          this.router.navigate(['/insertMatch']);
        }
        else { //es un usuario
          this.router.navigate(['/home']);
        }

      },
      error => {
        if (error.status === 401) {
          alert('Datos incorrectos');
        } else if (error.status === 400) {
          alert(error.error.msg || error.error.error);
        }
        else {
          alert('Ocurrió un error al iniciar sesión, verifica tus datos');
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('userId');
  }

  goBack() {
    this.router.navigate(['']);
  }
}


