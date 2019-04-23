import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/models/animal/animal';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-animal-container-page',
  templateUrl: './animalContainer.component.html',
  styleUrls: ['./animalContainer.component.css']
})
export class AnimalContainerComponent implements OnInit {

  catsOwnedByMales: Animal[] = [];
  catsOwnedByFemales: Animal[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAnimalOwners().subscribe(
      ownerList => {
        this.catsOwnedByMales = this.dataService
          .owenedByGenderAndSorted('Male', 'Cat', ownerList);

        this.catsOwnedByFemales = this.dataService
          .owenedByGenderAndSorted('Female', 'Cat', ownerList);
      }
    );
  }


}
