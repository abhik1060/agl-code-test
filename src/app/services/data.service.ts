
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gender, Owner } from 'src/app/models/owner/owner';
import { AnimalType,Animal } from 'src/app/models/animal/animal';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  RESOURCE_URL_ENDPOINT = 'http://agl-developer-test.azurewebsites.net/people.json';

  constructor(private http: HttpClient) { }

  public getAnimalOwners(): Observable<Owner[]> {
    return this.http.get(this.RESOURCE_URL_ENDPOINT) as Observable<Owner[]>;
  }

  public owenedByGenderAndSorted(gender: Gender, animalType: AnimalType, ownerList: Owner[]): Animal[] {
    /*
      For simplicity, each action is performed sequentially in one function.
    */
    return ownerList
      .filter((owner: Owner) => owner.gender === gender)
      .reduce((animalList: Animal[], curr: Owner) => {
        animalList.push(...curr.pets);
        return animalList;
      }, [] as Animal[])
      .filter((animal: Animal) => animal.type === animalType)
      .sort((petA: Animal, petB: Animal) => petA.name.localeCompare(petB.name));
  }
}
