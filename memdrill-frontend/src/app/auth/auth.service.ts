import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ACCESS_TOKEN_KEY = 'accessToken';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<{ accessToken: string }>(environment.baseApiUrl + 'auth/login', {
        user: { username, password }
      })
      .pipe(
        catchError((err) => of({ accessToken: '' })),
        map((result) => {
          if (result.accessToken !== '') {
            sessionStorage.setItem(this.ACCESS_TOKEN_KEY, result.accessToken);
          }
          return result.accessToken !== '';
        })
      );
  }

  logout() {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  getAccessToken(): string {
    return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  get isLoggedIn(): boolean {
    return sessionStorage.getItem(this.ACCESS_TOKEN_KEY) !== null;
  }
}
