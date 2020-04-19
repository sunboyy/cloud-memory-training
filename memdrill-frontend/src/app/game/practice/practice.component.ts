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
  recorder;

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
    // send to backend
    //
    this.no += 1;
  }

  async startRecode() {
    console.log('Start listening for 3 seconds . . .');
    this.recorder = await this.listenService.triggerListen1();
  }

  async stopRecode() {
    console.log('stop');
    if (this.recorder) {
      this.listenService.stop(this.recorder);
      const data = await this.listenService.triggerListen();
      const base64data = data.split(',')[1]
      console.log(base64data);
    }
  }

}
