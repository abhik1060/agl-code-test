import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gender, Owner } from 'src/app/models/owner/owner';
import { AnimalType, Animal } from 'src/app/models/animal/animal';
import { environment } from '../../../src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getAnimalOwners(): Observable<Owner[]> {
    return this.http.get(environment.endpoint) as Observable<Owner[]>;
  }

  public ownedByGenderAndSorted(gender: Gender, animalType: AnimalType, ownerList: Owner[]): Animal[] {
    return this.sortAnimals(ownerList
      .filter((owner: Owner) => owner.gender === gender)
      .reduce((animalList: Animal[], curr: Owner) => {
        animalList.push(...curr.pets);
        return animalList;
      }, [] as Animal[])
      .filter((animal: Animal) => animal.type === animalType));
  }

  private sortAnimals(animals) {
    return animals.sort((petA: Animal, petB: Animal) => petA.name.localeCompare(petB.name));
  }
}
