import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match';
import { MatchService } from '../../services/match.service';
import { TeamService } from '../../services/team.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Team } from '../../models/team';
import { MatchAndTeams } from '../../models/matchAndTeams';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NavbarComponent, CommonModule],
  standalone: true
})
export class HomeComponent implements OnInit {
  matchesAndTeams: MatchAndTeams[] = [];

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.matchService.getMatchesAndTeams().then((data) => {
      this.matchesAndTeams = data;
    }).catch((error) => {
      console.error('Error fetching matches and teams', error);
    });
  }
}
