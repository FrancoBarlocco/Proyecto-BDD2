import { Component, OnInit } from '@angular/core';
import { RankingService } from '../../services/ranking.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Ranking } from '../../models/ranking';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, AdminNavbarComponent],
})
export class RankingComponent implements OnInit {
  ranking: Ranking[] = [];
  isAdmin: boolean = false;
  userId: string | null = '';

  constructor(private rankingService: RankingService) { }

  ngOnInit(): void {

    //si la id es 53333 entonces es admin
    this.userId = localStorage.getItem('userId');
    if(this.userId == '53333') {
      this.isAdmin = true
    }

    this.rankingService.getRanking().then(ranking => {
      this.ranking = ranking;
    }).catch(error => {
      console.error('Error al obtener el ranking:', error);
    });
  }
}
