import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestion(difficulty: string): Observable<QuestionResponse> {
    return this.http.get<QuestionResponse>(environment.baseApiUrl + 'calculation/random', {
      params: { difficulty: difficulty }
    });
  }

  sendAnswer(){

  }
}

export interface QuestionResponse {
  success: boolean;
  value: {
    factorA: string;
    factorB: string;
    operator: string;
    difficulty: string;
    signature: string;
  };
}

export interface AnswerForm {
  success: boolean;
  value: {
    factorA: string;
    factorB: string;
    operator: string;
    difficulty: string;
    signature: string;
    answer: string;
  };
}
