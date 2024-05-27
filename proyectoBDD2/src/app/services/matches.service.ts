// src/app/services/matches.service.ts
import { Injectable } from '@angular/core';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  constructor() {}

  getMatches(): Promise<Match[]> {
    return new Promise((resolve, reject) => {
      const matches: Match[] = [
        new Match(0, 'Estadio Centenario', '2024-06-14', 1, 2, '/assets/images/Flags/png-transparent-flag-of-uruguay-national-flag-flags-of-the-world-flag-miscellaneous-flag-text.png', '/assets/images/Flags/png-transparent-flag-of-uruguay-national-flag-flags-of-the-world-flag-miscellaneous-flag-text.png'),
        new Match(1, 'Estadio Centenario', '2024-06-14', 1, 2, '/assets/images/team1-badge.png', '/assets/images/team2-badge.png'),
        new Match(2, 'Estadio Centenario', '2024-06-14', 1, 2, '/assets/images/team1-badge.png', '/assets/images/team2-badge.png'),
        new Match(3, 'Estadio Centenario', '2024-06-14', 1, 2, '/assets/images/team1-badge.png', '/assets/images/team2-badge.png'),
        new Match(4, 'Estadio Centenario', '2024-06-14', 1, 2, '/assets/images/team1-badge.png', '/assets/images/team2-badge.png'),
        new Match(5, 'Estadio Centenario', '2024-06-14', 1, 2, '/assets/images/team1-badge.png', '/assets/images/team2-badge.png'),
        // Agrega más partidos según sea necesario
      ];
      resolve(matches);
    });
  }
}
