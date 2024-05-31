import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Match } from '../models/match';
import { MatchAndTeams } from '../models/matchAndTeams';
import { firstValueFrom } from 'rxjs';
import { Student } from '../models/student';
import internal from 'stream';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost:5050/api/general';

  constructor(private http: HttpClient) {}

  login(Email : string, Password : string) {
    const body = { Email,  Password};
    return this.http.post<any>(`${this.apiUrl}/getCredentials`, body);
  }
}

export default LoginService