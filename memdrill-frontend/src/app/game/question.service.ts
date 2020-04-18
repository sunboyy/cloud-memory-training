import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { APIResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestion(difficulty: string): Observable<APIResponse<QuestionResponse>> {
    return this.http.get<APIResponse<QuestionResponse>>(environment.baseApiUrl + 'calculation/random', {
      params: { difficulty }
    });
  }

  sendAnswer() {}
}

export interface QuestionResponse {
  factorA: number;
  factorB: number;
  operator: string;
  difficulty: string;
  signature: string;
}

export interface AnswerForm {
  calculation: {
    factorA: number;
    factorB: number;
    operator: string;
    difficulty: string;
    signature: string;
    answer: number;
  };
}
