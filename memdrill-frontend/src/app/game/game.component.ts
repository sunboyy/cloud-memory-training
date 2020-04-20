import { Component, ViewChild, ElementRef } from '@angular/core';
import { QuestionService } from './question.service';
import { ListenService } from './listen.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  message = '0';

  question = 'no question';
  difficulty = 'easy';
  A: number;
  B: number;
  op: string;
  sig: string;
  answer: number;
  audioName = '';
  audioUrl = '';

  @ViewChild('myAudio') myAudio: ElementRef;

  constructor(private questionService: QuestionService, private listenService: ListenService) {}

  playSound() {
    this.myAudio.nativeElement.play();
  }

  get audioSrc() {
    return '/assets/voice/' + this.message + '.wav';
  }

  getQuestion(difficulty: string): any {
    this.questionService.getQuestion(difficulty).subscribe((result) => {
      if (result.success === true) {
        const value = result.value;
        this.A = value.factorA;
        this.B = value.factorB;
        this.op = value.operator;
        this.sig = value.signature;
        if (value.operator === 'add') {
          this.question = `${this.A} + ${this.B} = ?`;
        } else {
          this.question = `${this.A} - ${this.B} = ?`;
        }
      }
    });
  }

  async listen() {
    console.log('Start listening for 3 seconds . . .');
    let base64data = await this.listenService.triggerListen();
    base64data = base64data.split(',')[1];
    const answer = this.sendAudio(base64data);
  }

  sendAudio(base64data) {
    // POST to localhost:3000/google-api/stt
    // audio:{base64Data:}
  }

  stopListen() {
    this.listenService.stopListen();
  }
}
