import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { MatchService } from '../../services/match.service';
import { MatchAndTeams } from '../../models/matchAndTeams';
import { CommonModule } from '@angular/common';
import { match } from 'assert';

@Component({
  selector: 'app-insert-result',
  standalone: true,
  imports: [FormsModule, AdminNavbarComponent, CommonModule],
  templateUrl: './insert-result.component.html',
  styleUrl: './insert-result.component.css'
})
export class InsertResultComponent {

  matchId: number = 0;
  localTeamResult: number | null = null;
  visitantTeamResult: number | null = null;
  matchesAndTeams: MatchAndTeams[] = [];
  localTeam : string = '';
  visitantTeam : string = '';

  constructor(private matchService : MatchService) { }

  ngOnInit(): void {
  
    this.matchService.getMatchesAndTeams().then((data) => {
      this.matchesAndTeams = data;
    }).catch((error) => {
      console.error('Error al cargar equipos y partidos', error);
    });
  }



  insertResult() {
    this.matchService.updateMatchResult(this.matchId, this.localTeamResult!, this.visitantTeamResult!).subscribe({
      next: (response) => {
        alert('Partido ingresado correctamente');
        console.log('Partido infresado correctamente!', response);
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
  
  myFunction(){
    this.matchesAndTeams.forEach(element => {
      if(element.MatchId == this.matchId){
        this.localTeam = element.LocalTeamName
        this.visitantTeam = element.VisitantTeamName
      }
    });
    console.log(this.localTeam + this.visitantTeam + this.matchId)
  }
}
