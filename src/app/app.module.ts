import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaconDirective } from './directives/bacon.directive';
import { MainCanvasComponent } from './components/main-canvas/main-canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    BaconDirective,
    MainCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
