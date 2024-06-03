import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost:5050/api/general';
  private user: any = null;
  constructor(private http: HttpClient) {}

  login(Email : string, Password : string) {
    const body = { Email,  Password};
    return this.http.post<any>(`${this.apiUrl}/getCredentials`, body);
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  isLoggedIn(): boolean {
    // Verifica si el usuario está logueado
    return localStorage.getItem('user') !== null;
  }
}

export default LoginService