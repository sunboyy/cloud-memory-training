import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { APIResponse } from '../interfaces';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<APIResponse> {
    return this.http
      .post<APIResponse>(environment.baseApiUrl + 'user/register', {
        user: { username, password }
      })
      .pipe(
        catchError(
          (err: HttpErrorResponse): Observable<APIResponse> => {
            if (err.error.message) {
              return of({ success: false, error: err.error.message[0] });
            }
            return of({ success: false, error: err.statusText });
          }
        )
      );
  }
}
