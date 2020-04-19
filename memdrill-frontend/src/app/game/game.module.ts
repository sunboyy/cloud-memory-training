import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { LevelComponent } from './level/level.component';
import { PracticeComponent } from './practice/practice.component';


@NgModule({
  declarations: [GameComponent, LevelComponent, PracticeComponent],
  imports: [
    CommonModule, FormsModule, HttpClientModule, RouterModule
  ]
})
export class GameModule { }
