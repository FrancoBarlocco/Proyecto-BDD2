// src/app/services/info.service.ts
import { Injectable } from '@angular/core';
import { Fixture } from '../models/fixture';
import { Stadium } from '..//models/fixture';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }

  getFixtures(): Fixture[] {
    return [
      new Fixture('2024-06-14', 'Team A vs Team B', 'Stadium 1'),
      new Fixture('2024-06-15', 'Team C vs Team D', 'Stadium 2'),
      // Agrega más datos de ejemplo aquí
    ];
  }

  getStadiums(): Stadium[] {
    return [
      new Stadium('Stadium 1', 'City 1', 50000, '/assets/images/Stadiums/Allegiant Stadium.webp'),
      new Stadium('Stadium 2', 'City 2', 40000, '/assets/images/Stadiums/NRG.webp'),
      new Stadium('Stadium 1', 'City 1', 50000, '/assets/images/Stadiums/Levis.webp'),
      new Stadium('Stadium 2', 'City 2', 40000, '/assets/images/Stadiums/Q2.webp'),
    ];
  }
}
