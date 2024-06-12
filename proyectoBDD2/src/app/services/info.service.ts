// src/app/services/info.service.ts
import { Injectable } from '@angular/core';
import { Fixture } from '../models/fixture';
import { Stadium } from '..//models/stadium';

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

  }
