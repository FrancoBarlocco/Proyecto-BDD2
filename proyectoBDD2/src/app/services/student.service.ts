import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiUrl = 'http://localhost:5050/api/general';

  constructor(private http: HttpClient) { }

  findUserByCi(ci: number): Promise<Student> {
    return firstValueFrom(this.http.get<Student>(`${this.apiUrl}/getStudentByCi/${ci}`));
  }

  getStudents(): Promise<Student[]> {
    return firstValueFrom(this.http.get<Student[]>(this.apiUrl + '/getStudents'));
  }
}
