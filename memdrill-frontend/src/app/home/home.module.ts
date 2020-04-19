import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CalculationService } from './calculation.service';
import { StatComponent } from './stat/stat.component';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [StatComponent],
  imports: [CommonModule, HttpClientModule, RouterModule, AuthModule],
  providers: [CalculationService]
})
export class HomeModule {}
