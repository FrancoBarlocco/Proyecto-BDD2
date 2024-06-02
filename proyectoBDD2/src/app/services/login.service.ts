import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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