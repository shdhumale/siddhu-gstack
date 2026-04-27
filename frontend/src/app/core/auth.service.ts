import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('jwtToken'));
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: any) {
    return this.http.post<any>('http://localhost:8080/auth/login', credentials).pipe(
      tap(res => {
        if (res.token) {
          localStorage.setItem('jwtToken', res.token);
          this.tokenSubject.next(res.token);
        }
      })
    );
  }

  register(userData: any) {
    return this.http.post<any>('http://localhost:8080/auth/register', userData);
  }

  updatePassword(passwordData: any) {
    return this.http.post<any>('http://localhost:8080/auth/update-password', passwordData);
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.tokenSubject.next(null);
  }

  getToken() {
    return this.tokenSubject.value;
  }
}
