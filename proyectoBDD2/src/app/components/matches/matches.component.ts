/*// src/app/components/matches/matches.component.ts
import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  standalone:true
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];

  constructor(private matchesService: MatchesService) {}

  ngOnInit() {
    this.matchesService.getMatches().then(matches => {
      this.matches = matches;
    });
  }
}*/
