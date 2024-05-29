import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../models/match';
import { MatchAndTeams } from '../models/matchAndTeams';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  apiUrl = 'http://localhost:5050/api/general';

  constructor(private http: HttpClient) {}

  getMatches(): Promise<Match[]> {
    return firstValueFrom(this.http.get<Match[]>(this.apiUrl + '/getMatches'));
  }

  getMatchById(id: number): Promise<Match> {
    return firstValueFrom(this.http.get<Match>(`${this.apiUrl}/getMatchById/${id}`));
  }

  getMatchesAndTeams(): Promise<MatchAndTeams[]> {
    return firstValueFrom(this.http.get<MatchAndTeams[]>(this.apiUrl + '/getMatchesAndTeams'));
  }
}
