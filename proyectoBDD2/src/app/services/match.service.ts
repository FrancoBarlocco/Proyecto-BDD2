import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Match } from '../models/match';
import { MatchAndTeams } from '../models/matchAndTeams';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  apiUrl = 'http://localhost:5050/api/general';

  constructor(private http: HttpClient) {}

  getMatches(): Promise<Match[]> {
    return firstValueFrom(this.http.get<Match[]>(`${this.apiUrl}/getMatches`));
  }

  getMatchById(id: number): Promise<Match> {
    return firstValueFrom(this.http.get<Match>(`${this.apiUrl}/getMatchById/${id}`));
  }

  getMatchesAndTeams(): Promise<MatchAndTeams[]> {
    return firstValueFrom(this.http.get<MatchAndTeams[]>(`${this.apiUrl}/getMatchesAndTeams`));
  }

  savePredictions(userId: number, matchId: number, localPrediction: number, visitantPrediction: number): Promise<ApiResponse> {
    return firstValueFrom(this.http.post<ApiResponse>(`${this.apiUrl}/predictions/save`, {userId, matchId, localPrediction, visitantPrediction }));
  }
}
