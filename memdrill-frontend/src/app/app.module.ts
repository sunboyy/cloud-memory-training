import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, GameModule, HomeModule, UserModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
