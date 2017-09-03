import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routes.module';

import { AppComponent } from './app.component';
import { CreateGameComponent } from './landing/create';
import { PatchNotesComponent } from './landing/notes';
import { LandingComponent } from './landing/landing';
import { GameComponent } from './game/game';
import { PlayerComponent } from './game/player';
import { GameService } from './game/game.service';
import { SharingService } from './game/sharing.service';

import { HttpModule, Http } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    CreateGameComponent,
    PatchNotesComponent,
    LandingComponent,

    GameComponent,
    PlayerComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule
  ],
  providers: [GameService, SharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
