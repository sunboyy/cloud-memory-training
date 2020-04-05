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
      .post<{ access_token: string }>(environment.baseApiUrl + 'auth/login', {
        user: { username, password }
      })
      .pipe(
        catchError((err) => of({ access_token: '' })),
        map((result) => {
          if (result.access_token !== '') {
            sessionStorage.setItem(this.ACCESS_TOKEN_KEY, result.access_token);
          }
          return result.access_token !== '';
        })
      );
  }

  logout() {
    sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  get isLoggedIn(): boolean {
    return sessionStorage.getItem(this.ACCESS_TOKEN_KEY) !== null;
  }
}
