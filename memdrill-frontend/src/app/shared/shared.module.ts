import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
  declarations: [ErrorComponent, ProgressComponent],
  imports: [CommonModule],
  exports: [ErrorComponent, ProgressComponent]
})
export class SharedModule {}
