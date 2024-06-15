import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class registerService {
  apiUrl = 'http://localhost:5050/api/general';

  constructor(private http: HttpClient) {}


  register(Ci : string, FirstName : string, LastName: string, Email : string, Password : string, Career : string, ChampionTeamId : number, SubChampionTeamId : number, Contact : string) {
    const body = { Ci, FirstName, LastName, Email, Password, Career, ChampionTeamId, SubChampionTeamId, Contact};
    return this.http.post<Student>(`${this.apiUrl}/postStudent`, body);
  }
}

export default registerService