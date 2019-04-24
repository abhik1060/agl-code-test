import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalResultComponent } from './components/animalResult/animalResult.component';
import { AnimalContainerComponent } from './components/animalContainer/animalContainer.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimalContainerComponent,
    AnimalResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
