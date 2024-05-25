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
        new Match(0, 'Estadio Centenario', '2024-06-14', 1, 2),
        new Match(1, 'Estadio Centenario', '2024-06-14', 1, 2),
        // Agrega más partidos según sea necesario
      ];
      resolve(matches);
    });
  }
}
