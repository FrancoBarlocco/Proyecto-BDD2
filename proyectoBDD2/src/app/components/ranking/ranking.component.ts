import { Component, OnInit } from '@angular/core';
import { RankingService } from '../../services/ranking.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  standalone:true,
  imports: [NavbarComponent, CommonModule],
})
export class RankingComponent implements OnInit {
  ranking!: { name: string; points: number; }[];

  constructor(private rankingService: RankingService) { }

  ngOnInit(): void {
    this.ranking = this.rankingService.getRanking();
  }
}
