import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../../services/match.service';
import { Stadium } from '../../models/stadium';
import { StudentService } from '../../services/stadium.service';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-insert-match',
  standalone: true,
  imports: [CommonModule, AdminNavbarComponent, FormsModule],
  templateUrl: './insert-match.component.html',
  styleUrl: './insert-match.component.css'
})
export class InsertMatchComponent implements OnInit {
  localTeam: string =''
  visitantTeam: string = '';
  date: string = '';
  stadiums!: Stadium[];
  stadium : string = '';
  teams!: Team[];

  constructor(private matchService : MatchService, private stadiumService : StudentService, private teamService : TeamService) { }

  ngOnInit(): void {
  
    this.stadiumService.getStadiums().subscribe({
      next: (data: Stadium[]) => {
        this.stadiums = data;
        console.log(this.stadiums)
      },
      error: (error) => {
        console.error('Error cargando estadios', error);
      }
    });

    this.teamService.getTeams().subscribe({
      next: (data: Team[]) => {
        this.teams = data;
      },
      error: (error) => {
        console.error('Error cargando equipos', error);
      }
    });
  }


  insertMatch() {
    const localTeam = this.teams.find(team => team.Name === this.localTeam);
    const visitantTeam = this.teams.find(team => team.Name === this.visitantTeam);

    if (!localTeam || !visitantTeam || !this.date || !this.stadium ) {
      alert('Selecciona todos los campos');
      return;
    }
    const matchDate = new Date(this.date);

    // formatea la fecha 'YYYY-MM-DD HH:MM:SS'
    const year = matchDate.getFullYear();
    const month = ('0' + (matchDate.getMonth() + 1)).slice(-2);
    const day = ('0' + matchDate.getDate()).slice(-2);
    const hours = ('0' + matchDate.getHours()).slice(-2);
    const minutes = ('0' + matchDate.getMinutes()).slice(-2);
    const seconds = ('0' + matchDate.getSeconds()).slice(-2);

    const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    this.matchService.postMatch(localTeam!.TeamId, visitantTeam!.TeamId, date, this.stadium).subscribe({
      next: (response) => {
        alert('Partido ingresado correctamente');
        console.log('Partido infresado correctamente!', response);

        // Restablece los campos del formulario
        this.localTeam = '';
        this.visitantTeam = '';
        this.date = '';
        this.stadium = '';

      },
      error: (error) => {
        if (error.status === 500) {
          alert('Ocurrió un error');
        } else {
          alert('Ocurrió un error inesperado' + error.status);
        }
      }
    });
  }
}