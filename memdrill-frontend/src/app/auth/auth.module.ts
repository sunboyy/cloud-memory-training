import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SignInComponent],
  providers: [AuthService],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule]
})
export class AuthModule {}
