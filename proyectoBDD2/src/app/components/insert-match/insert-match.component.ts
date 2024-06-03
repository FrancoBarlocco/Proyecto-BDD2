import { Component, OnInit } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../../services/match.service';
import { Stadium } from '../../models/stadium';
import { StudentService } from '../../services/stadium.service';

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
  date: Date = new Date('0000-00-00T00:00:00');
  city: string = '';
  stadium : string = '';
  stadiums!: Stadium[];

  constructor(private matchService : MatchService, private stadiumService : StudentService) { }

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
  }


  insertMatch() {
    this.matchService.postMatch(this.localTeam, this.visitantTeam, this.date, this.city, this.stadium).subscribe({
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