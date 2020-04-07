import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { GameComponent } from './game/game.component';
const routes: Routes = [
  { path: 'auth/login', component: SignInComponent },
  { path: 'game', component: GameComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
