import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stadium } from '../models/stadium';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiUrl = 'http://localhost:5050/api/general';

  constructor(private http: HttpClient) { }

  getStadiumById(id: number): Observable<Stadium> {
    return this.http.get<Stadium>(`${this.apiUrl}/getStadiumById/${id}`);
  }

  getStadiums(): Observable<Stadium[]> {
    return this.http.get<Stadium[]>(this.apiUrl + '/getStadiums');
  }

}
