import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match';
import { MatchService } from '../../services/match.service';
import { TeamService } from '../../services/team.service';
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

  matches: (Match & { localTeam?: Team; visitantTeam?: Team })[] = [];

  constructor(private matchesService: MatchService, private teamService: TeamService) {}

  ngOnInit() {
    this.matchesService.getMatches().then(response => {
      if (Array.isArray(response) && Array.isArray(response[0])) {
        this.matches = response[0];
      } else {
        console.error('Unexpected response format:', response);
        return;
      }

      console.log(this.matches);
      
      });
    };


    getInfoTeams() {
      this.matches.forEach(match => {
        this.teamService.getTeamById(match.localTeamId).subscribe(localTeam => {
          if (Array.isArray(localTeam)) {
            match.localTeam = localTeam[0]; // Asigna el primer elemento del arreglo si la respuesta es un arreglo
          } else {
            match.localTeam = localTeam; // Asigna directamente si es un objeto
          }
          console.log('Local Team:', match.localTeam);
        });
  
    })
  }
}
