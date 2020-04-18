import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { GameComponent } from './game/game.component';
import { RegisterComponent } from './user/register/register.component';
import { StatComponent } from './home/stat/stat.component';

const routes: Routes = [
  { path: '', component: StatComponent },
  { path: 'auth/login', component: SignInComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'game', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
