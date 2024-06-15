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

  matchId: number | null = null;
  localTeamResult: number | null = null;
  visitantTeamResult: number | null = null;
  matchesAndTeams: MatchAndTeams[] = [];
  localTeam : string = '';
  visitantTeam : string = '';

  constructor(private matchService : MatchService) { }

  ngOnInit(): void {
  
    this.matchService.getMatchesAndTeams().then((data) => {
      this.matchesAndTeams = data;
      this.matchesAndTeams.forEach(element => {
        element.Date = this.formatDateToDDMMYYYY(element.Date);
      });
    }).catch((error) => {
      console.error('Error al cargar equipos y partidos', error);
    });
  }

  insertResult() {

    if (this.matchId === null) {
      alert('Selecciona un partido.');
      return;
    }
  
    if (this.localTeamResult! < 0 || this.visitantTeamResult! < 0 || typeof this.localTeamResult !== 'number' || typeof this.visitantTeamResult !== 'number') {
      alert('Ingresa datos válidos o completa todos los campos');
      return;
    }
  
    else{
    this.matchService.updateMatchResult(this.matchId!, this.localTeamResult!, this.visitantTeamResult!).subscribe({
      next: (response) => {
        alert('Resultado ingresado correctamente');
        console.log('Resultado infresado correctamente!', response);
        this.resetForm()
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

  private formatDateToDDMMYYYY(date: string | Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }
  
  selectTeamNames(){
    this.matchesAndTeams.forEach(element => {
      if(element.MatchId == this.matchId){
        this.localTeam = element.LocalTeamName
        this.visitantTeam = element.VisitantTeamName
      }
    });
    console.log(this.localTeam + this.visitantTeam + this.matchId)
  }

  resetForm() {
    this.matchId = null;
    this.localTeamResult = null;
    this.visitantTeamResult = null;
    this.localTeam = '';
    this.visitantTeam = '';
  }
}
