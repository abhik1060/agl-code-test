import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal/animal';

@Component({
  selector: 'app-animal-container-page',
  templateUrl: './animalContainer.component.html',
  styleUrls: ['./animalContainer.component.scss']
})
export class AnimalPageComponent implements OnInit {

  catsOwnedByMales: Animal[] = [];
  catsOwnedByFemales: Animal[] = [];

  constructor() { }


}
