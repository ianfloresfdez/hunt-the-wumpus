import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './main/game/game.component';
import { MainComponent } from './main/main.component';
GameComponent;
const routes: Routes = [
  //ROUTE DECLARATION
  { path: 'home', component: MainComponent },
  { path: 'game/:boardLen/:wells/:spears', component: GameComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
