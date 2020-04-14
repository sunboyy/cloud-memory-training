import { Component, ViewChild, ElementRef } from '@angular/core';
import { QuestionService, QuestionResponse } from './question.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent {

  message = '0';

  question = 'no question';
  difficulty = 'easy';
  A;
  B;
  op;
  sig;

  @ViewChild('myAudio') myAudio: ElementRef;

  constructor(private questionService: QuestionService) {}

  playSound() {
    this.myAudio.nativeElement.play();
  }

  get audioSrc() {
    return '/assets/voice/'+this.message+'.wav'
  }

  getQuestion(difficulty: string): any {
    console.log(difficulty);
    this.questionService.getQuestion(difficulty).subscribe(result => {
      if(result.success === true){
        var value = result.value;
        this.A = value.factorA;
        this.B = value.factorB;
        this.op = value.operator;
        this.sig = value.signature;
        if(value.operator === 'add'){
          this.question = `${this.A} + ${this.B} = ?`;
        }
        else{
          this.question = `${this.A} - ${this.B} = ?`;
        }
      }
    });
    //TODO: call Text To Speech and play sound here
  }



}
