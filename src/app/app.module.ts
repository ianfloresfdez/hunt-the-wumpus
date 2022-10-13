//different modules importation
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//main components importation
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BoardComponent } from './main/board/board.component';
import { GameComponent } from './main/game/game.component';

@NgModule({
  declarations: [AppComponent, MainComponent, BoardComponent, GameComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
