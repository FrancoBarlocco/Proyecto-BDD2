import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class statisticService {
  apiUrl = 'http://localhost:5050/api/general';

  constructor(private http: HttpClient) {}

getStatisticsByCareer(): Observable<any> {
  return this.http.get<any>(this.apiUrl + '/getStatistics');
}

}