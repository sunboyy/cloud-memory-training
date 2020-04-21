import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {
  @Input()
  value = 0;

  @Input()
  max = 10;

  get percentage(): number {
    return (this.value * 100) / this.max;
  }
}
