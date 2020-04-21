import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { ListenService } from '../listen.service';
import { CalculationService } from 'src/app/home/calculation.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Calculation } from 'src/app/interfaces';

@Component({
  selector: 'app-practice',
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [style({ opacity: 1 }), animate('200ms ease-in', style({ opacity: 0 }))])
    ])
  ],
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  difficulty: string;
  progressValue = 0;
  currentQuestion = 0;
  maxQuestion = 10;
  recorder;
  base64Data: string;
  answer: number;
  message: string;
  result: string;
  isLoading = false;
  isRecording = false;

  calculation: Calculation;

  get operatorSign(): string {
    if (this.calculation.operator === 'add') {
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
    private calculationService: CalculationService
  ) {}

  ngOnInit(): void {
    this.difficulty = this.route.snapshot.paramMap.get('difficulty');
    this.nextQuestion();
  }

  nextQuestion(): any {
    this.currentQuestion++;
    this.questionService.getQuestion(this.difficulty).subscribe((result) => {
      if (result.success === true) {
        const value = result.value;
        this.calculation = value;
      }
    });
  }

  onExit(): void {
    this.router.navigate(['']);
  }

  onSubmit(): void {
    this.calculationService.submitAnswer(this.calculation).subscribe((result) => {
      if (result.success) {
        this.result = result.value;
        this.progressValue++;
      }
    });
  }

  onNext(): void {
    this.nextQuestion();
    this.result = '';
    this.message = '';
  }

  checkRecord() {
    this.isLoading = true;
    this.message = '';
    this.questionService.submitRecord(this.base64Data).subscribe((result) => {
      this.isLoading = false;
      this.calculation.answer = result;
      if (!this.calculation.answer) {
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
