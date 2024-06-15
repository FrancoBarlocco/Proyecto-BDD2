import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stadium } from '../models/stadium';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiUrl = 'http://localhost:5050/api/general';

  constructor(private http: HttpClient) { }

  getStadiums(): Observable<Stadium[]> {
    return this.http.get<Stadium[]>(this.apiUrl + '/getStadiums');
  }

}