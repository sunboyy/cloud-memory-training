import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { ListenService } from '../listen.service';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  difficulty: string;
  factorA: number;
  factorB: number;
  operator: string;
  signature: string;
  no = 0;
  maxNumber = 5;

  get operatorSign(): string {
    if (this.operator === 'add') {
      return '+';
    } else {
      return '-';
    }
  }

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router,
    private listenService: ListenService
  ) {}

  ngOnInit(): void {
    this.difficulty = this.route.snapshot.paramMap.get('difficulty');
    this.getQuestion(this.difficulty);
    this.no = 1;
  }

  getQuestion(difficulty: string): any {
    console.log(difficulty);
    this.questionService.getQuestion(difficulty).subscribe((result) => {
      if (result.success === true) {
        const value = result.value;
        this.factorA = value.factorA;
        this.factorB = value.factorB;
        this.operator = value.operator;
        this.signature = value.signature;
      }
    });
  }

  exit(): void {
    this.router.navigate(['']);
  }

  nextQuestion(): void {
    this.getQuestion(this.difficulty);
    this.no += 1;
  }

  async listen() {
    console.log('listen');
    const url = await this.listenService.triggerListen();
    console.log(url);
  }

  stopListen(): void {
    console.log('stop');
  }
}
