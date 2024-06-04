import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models/team';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  apiUrl = 'http://localhost:5050/api/general';

  constructor(private http: HttpClient) {}

getTeams(): Observable<Team[]> {
  return this.http.get<Team[]>(`${this.apiUrl}/getTeams`);
}

getTeamById(id: number): Observable<Team> {
  return this.http.get<Team>(`${this.apiUrl}/getTeamById/${id}`);
}
}

