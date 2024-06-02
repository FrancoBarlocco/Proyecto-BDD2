import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-insert-result',
  standalone: true,
  imports: [FormsModule, AdminNavbarComponent],
  templateUrl: './insert-result.component.html',
  styleUrl: './insert-result.component.css'
})
export class InsertResultComponent {

  matchId: number = 0;
  localTeamResult: number = 0;
  visitantTeamResult: number = 0;

  constructor(private matchService : MatchService) { }

  insertResult() {
    this.matchService.updateMatchResult(this.matchId, this.localTeamResult, this.visitantTeamResult).subscribe({
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
}
