import { Component } from '@angular/core';
import RegisterService from '../../services/register.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [FormsModule, CommonModule],
  standalone:true
})

export class RegisterComponent {
  teams!: Team[];

  ngOnInit(): void {
    this.getTeams();
  }

  constructor(private registerService: RegisterService, private router : Router, private teamService : TeamService) { }
  ci : string = '';
  firstName: string = '';
  lastName : string = ''
  email: string = '';
  password: string = '';
  career: string = '';
  championTeamId: number | null = null;
  subChampionTeamId: number | null = null;
  championTeamName: string = '';
  subChampionTeamName: string = '';
  contact: string = '';

  register() {
    this.registerService.register(this.ci, this.firstName, this.lastName, this.email, this.password, this.career, this.championTeamId!, this.subChampionTeamId!, this.contact).subscribe({
      next: (response) => {
        alert('Registrado correctamente!');
        console.log('Registrado correctamente!', response);
        localStorage.setItem('userId', this.ci);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        if (error.status === 401) {
          alert('El usuario no está registrado');
        } else {
          alert('Ocurrió un error durante el registro');
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['']); 
  }

  getTeams(){
    this.teamService.getTeams().subscribe({
      next: (data: Team[]) => {
        this.teams = data;
      },
      error: (error) => {
        console.error('Error cargando equipos', error);
      }
    }); 
  }

  setChampionTeam(event: any) {
    const selectedTeam = this.teams.find(team => team.Name === event.target.value);
    if (selectedTeam) {
      this.championTeamId = selectedTeam.TeamId;
      this.championTeamName = selectedTeam.Name;
    }
  }

  setSubChampionTeam(event: any) {
    const selectedTeam = this.teams.find(team => team.Name === event.target.value);
    if (selectedTeam) {
      this.subChampionTeamId = selectedTeam.TeamId;
      this.subChampionTeamName = selectedTeam.Name;
    }
}
}

