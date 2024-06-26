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

  getMatchesAndTeams(): Promise<MatchAndTeams[]> {
    return firstValueFrom(this.http.get<MatchAndTeams[]>(`${this.apiUrl}/getMatchesAndTeams`));
  }

  savePredictions(userId: number, matchId: number, localPrediction: number, visitantPrediction: number): Promise<ApiResponse> {
    const body = { userId, matchId, localPrediction, visitantPrediction };
    return firstValueFrom(this.http.post<ApiResponse>(`${this.apiUrl}/savePredictions`, body));
  }

  postMatch(localTeam: number, visitantTeam: number, date: string, stadiumId: number, category: string) {
    const body = {localTeam, visitantTeam, date, stadiumId, category}

    return this.http.post<Match>(`${this.apiUrl}/postMatch`, body);
  }

  updateMatchResult(matchId: number, localTeamResult: number, visitantTeamResult: number) {
    const body = {localTeamResult, visitantTeamResult}
    return this.http.post<Match>(`${this.apiUrl}/updateMatch/${matchId}`, body);
  }

  getPredictions(userId: number): Promise<any> { 
    return firstValueFrom(this.http.get<any>(`${this.apiUrl}/getPredictions/${userId}`));
  }

  updatePredict(userId: number, matchId: number, localPrediction: number, visitantPrediction: number){
    const body = { userId, matchId, localPrediction, visitantPrediction };
    return firstValueFrom(this.http.patch<ApiResponse>(`${this.apiUrl}/updatePrediction`, body));
  }
  }

