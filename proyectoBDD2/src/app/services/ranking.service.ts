import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ranking } from '../models/ranking';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  apiUrl = 'http://localhost:5050/api/general';

  constructor(private http: HttpClient) { }

  getRanking(): Promise<Ranking[]> {
    return firstValueFrom(this.http.get<Ranking[]>(this.apiUrl + '/getRanking'));
  }
}
