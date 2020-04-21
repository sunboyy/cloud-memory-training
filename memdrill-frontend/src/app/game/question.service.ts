import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { APIResponse, Calculation } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestion(difficulty: string): Observable<APIResponse<Calculation>> {
    return this.http.get<APIResponse<Calculation>>(environment.baseApiUrl + 'calculation/random', {
      params: { difficulty }
    });
  }

  submitRecord(base64Data: string): Observable<any> {
    return this.http.post<any>(environment.baseApiUrl + 'google-api/stt', {
      audio: { base64Data }
    });
  }
}
