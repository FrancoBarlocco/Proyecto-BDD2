import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match';
import { MatchService } from '../../services/matchService';
import { TeamService } from '../../services/teamService';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Team } from '../../models/team';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NavbarComponent, CommonModule],
  standalone: true
})
export class HomeComponent implements OnInit {
  matches: Match[] = [];
  localTeam!: Team;
  visitantTeam!: Team;

  constructor(private matchesService: MatchService, private teamService: TeamService) {}

  ngOnInit() {
    this.matchesService.getMatches().then(matches => {
      this.matches = matches;
      this.matches.forEach(match => {
        this.teamService.getTeamById(match.localTeamId).then(localTeam => {
          this.localTeam = localTeam;
        });
        this.teamService.getTeamById(match.visitantTeamId).then(visitantTeam => {
          this.visitantTeam = visitantTeam;
        });
      });
    });
  }
}
