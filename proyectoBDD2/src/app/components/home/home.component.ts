import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true
})
export class HomeComponent implements OnInit {
  matches: Match[] = [];

  constructor(private matchesService: MatchesService) {}

  ngOnInit() {
    this.matchesService.getMatches().then(matches => {
      this.matches = matches;
    });
  }
}
