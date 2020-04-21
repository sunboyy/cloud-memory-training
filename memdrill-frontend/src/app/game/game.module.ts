import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { SharedModule } from '../shared/shared.module';
import { GameComponent } from './game.component';
import { LevelComponent } from './level/level.component';
import { PracticeComponent } from './practice/practice.component';


@NgModule({
  declarations: [GameComponent, LevelComponent, PracticeComponent],
  imports: [
    CommonModule, FormsModule, HttpClientModule, RouterModule, BrowserAnimationsModule, HomeModule, SharedModule
  ]
})
export class GameModule { }
