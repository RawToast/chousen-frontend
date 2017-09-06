import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateGameComponent } from './landing/create';
import { PatchNotesComponent } from './landing/notes';
import { LandingComponent } from './landing/landing';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: '', redirectTo: 'game', pathMatch: 'full' },
  { path: 'game',  component: LandingComponent },
  { path: 'game/:id', component: GameComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
