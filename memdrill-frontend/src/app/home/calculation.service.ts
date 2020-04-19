import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Stat } from './stat/stat';
import { AuthService } from '../auth/auth.service';

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
}
