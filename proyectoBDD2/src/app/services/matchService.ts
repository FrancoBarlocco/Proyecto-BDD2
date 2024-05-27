import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../models/match';
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
}
