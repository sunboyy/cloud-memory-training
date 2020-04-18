import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { APIResponse } from '../interfaces';
import { Stat } from './stat/stat';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(private http: HttpClient) { }

  private getHeaders(): { [header: string]: string | string[] } {
    return { Authorization: 'Bearer ' + sessionStorage.getItem('accessToken') };
  }

  stats(): Observable<Stat> {
    return this.http
      .get<Stat>(environment.baseApiUrl + 'calculation/stats', {
        headers: this.getHeaders()
      });
  }
}
