import { Component, OnInit } from '@angular/core';
import { RankingService } from '../../services/ranking.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Ranking } from '../../models/ranking';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule],
})
export class RankingComponent implements OnInit {
  ranking: Ranking[] = [];

  constructor(private rankingService: RankingService) { }

  ngOnInit(): void {
    this.rankingService.getRanking().then(ranking => {
      this.ranking = ranking;
    }).catch(error => {
      console.error('Error al obtener el ranking:', error);
    });
  }
}
