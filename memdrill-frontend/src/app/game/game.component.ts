import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  message = '0';

  @ViewChild('myAudio') myAudio: ElementRef;

  onSubmit() {
    this.myAudio.nativeElement.play();
  }

  get audioSrc() {
    return '/assets/voice/'+this.message+'.wav'
  }
}
