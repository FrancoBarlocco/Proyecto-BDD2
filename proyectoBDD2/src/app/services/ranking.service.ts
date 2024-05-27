import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor() { }

  getRanking(): Student[] {
    return [
      new Student('Juan Pérez', 150),
      new Student('María López', 145),
      new Student('Carlos García', 140),
    ];
  }
}
