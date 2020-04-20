import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { PracticeComponent } from './game/practice/practice.component';
import { LevelComponent } from './game/level/level.component';
import { StatComponent } from './home/stat/stat.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', component: StatComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always'},
  { path: 'auth/login', component: SignInComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'game', component: LevelComponent },
  { path: 'game/:difficulty', component: PracticeComponent, canActivate: [AuthGuard], runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
