import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, AuthModule, RouterModule],
  exports: [NavComponent]
})
export class CoreModule {}
