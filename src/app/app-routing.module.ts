import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalContainerComponent } from './components/animalContainer/animalContainer.component';

const routes: Routes = [
  { path: '', component: AnimalContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
