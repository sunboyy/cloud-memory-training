import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Stat, Calculation } from '../interfaces';
import { AuthService } from '../auth/auth.service';
import { APIResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): { [header: string]: string | string[] } {
    return { Authorization: 'Bearer ' + this.authService.getAccessToken() };
  }

  getStats(): Observable<Stat> {
    return this.http.get<Stat>(environment.baseApiUrl + 'calculation/stats', {
      headers: this.getHeaders()
    });
  }

  submitAnswer(calculation: Calculation): Observable<APIResponse> {
    return this.http.post<APIResponse>(
      environment.baseApiUrl + 'calculation/submit',
      {
        calculation
      },
      {
        headers: this.getHeaders()
      }
    );
  }
}
