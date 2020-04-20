import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { ListenService } from '../listen.service';
import { CalculationService } from 'src/app/home/calculation.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-practice',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ],
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
  maxNumber = 10;
  recorder;
  base64Data: string;
  answer: number;
  message: string;
  result: string;
  isLoading = false;
  isRecording = false;

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
    private listenService: ListenService,
    private calculation: CalculationService
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

  submit(): void {
    this.calculation
      .submitAnswer({
        calculation: {
          factorA: this.factorA,
          factorB: this.factorB,
          operator: this.operator,
          difficulty: this.difficulty,
          signature: this.signature,
          answer: this.answer
        }
      })
      .subscribe((result) => {
        console.log(result);
        if (result.success) {
          this.result = result.value;
        }
      });
  }

  next(): void {
    this.getQuestion(this.difficulty);
    this.no += 1;
    this.answer = null;
    this.result = '';
    this.message = '';
  }

  checkRecord() {
    this.isLoading = true;
    // console.log(this.base64Data);
    this.message = '';
    this.questionService.submitRecord(this.base64Data).subscribe((result) => {
      // console.log(result);
      this.isLoading = false;
      this.answer = result;
      if (!this.answer) {
        this.message = 'Please try again!';
      }
    });
  }

  async startRecord() {
    console.log('Start listening . . .');
    this.isRecording = true;
    this.message = '';
    this.recorder = await this.listenService.triggerListen1();
  }

  async stopRecord() {
    console.log('stop');
    this.isRecording = false;
    const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
    await sleep(500);
    if (this.recorder) {
      const data = await this.listenService.stop(this.recorder);
      this.base64Data = data.split(',')[1];
      this.checkRecord();
    }
  }
}
