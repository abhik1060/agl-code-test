import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { Owner } from '../models/owner/owner';
import { Animal } from '../models/animal/animal';
import { environment } from '../../environments/environment';

describe('DataService', () => {
  let injector: TestBed;
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    injector = getTestBed();
    service = injector.get(DataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should get owners', () => {
    const mockOwners: Owner[] = [
      {
        name: 'Bob',
        gender: 'Male',
        age: 23,
        pets: [
          { name: 'Fido', type: 'Dog' },
          { name: 'Fido', type: 'Cat' },
        ]
      },
      {
        name: 'Jennifer',
        gender: 'Female',
        age: 18,
        pets: [
          { name: 'Fido', type: 'Dog' },
          { name: 'Fido', type: 'Cat' },
          { name: 'Fido', type: 'Fish' },
        ]
      },
      {
        name: 'Max',
        gender: 'Male',
        age: 44,
        pets: [
          { name: 'Fido', type: 'Bird' },
        ]
      },
    ];

    service
      .getAnimalOwners()
      .subscribe((owners: Owner[]) => {
        expect(owners).toBe(mockOwners);
      });

    const mockReq = httpMock.expectOne(environment.endpoint);

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockOwners);
  });

  it('Should filter by pet type', () => {
    const mockOwners: Owner[] = [
      {
        name: 'Bob',
        gender: 'Male',
        age: 23,
        pets: [
          { name: 'Fido', type: 'Dog' },
          { name: 'Mittens', type: 'Cat' },
        ]
      },
      {
        name: 'Jennifer',
        gender: 'Female',
        age: 32,
        pets: [
          { name: 'Feathers', type: 'Bird' },
          { name: 'Bubbles', type: 'Fish' },
        ]
      },
    ];

    service
      .getAnimalOwners()
      .subscribe((owners: Owner[]) => {
        const onlyBeCats = service
          .ownedByGenderAndSorted('Male', 'Cat', owners);
        expect(onlyBeCats.every((pet: Animal) => pet.type === 'Cat')).toBeTruthy();
        expect(onlyBeCats.every((pet: Animal) => pet.type === 'Dog')).toBeFalsy();

        const onlyBeDogs = service
          .ownedByGenderAndSorted('Male', 'Dog', owners);
        expect(onlyBeDogs.every((pet: Animal) => pet.type === 'Dog')).toBeTruthy();
        expect(onlyBeDogs.every((pet: Animal) => pet.type === 'Bird')).toBeFalsy();

        const onlyBeBirds = service
          .ownedByGenderAndSorted('Female', 'Bird', owners);
        expect(onlyBeBirds.every((pet: Animal) => pet.type === 'Bird')).toBeTruthy();
        expect(onlyBeBirds.every((pet: Animal) => pet.type === 'Fish')).toBeFalsy();

        const onlyBeFish = service
          .ownedByGenderAndSorted('Female', 'Fish', owners);
        expect(onlyBeFish.every((pet: Animal) => pet.type === 'Fish')).toBeTruthy();
        expect(onlyBeFish.every((pet: Animal) => pet.type === 'Cat')).toBeFalsy();
      });

    const mockReq = httpMock.expectOne(environment.endpoint);
    mockReq.flush(mockOwners);
  });

  it('Should filter pets by owners gender', () => {
    const mockOwners: Owner[] = [
      {
        name: 'Bob',
        gender: 'Male',
        age: 23,
        pets: [
          { name: 'Fido', type: 'Dog' },
        ]
      },
      {
        name: 'Jennifer',
        gender: 'Female',
        age: 32,
        pets: [
          { name: 'Boxer', type: 'Dog' },
        ]
      },
    ];

    service
      .getAnimalOwners()
      .subscribe((owners: Owner[]) => {

        const onlyMaleOwnerPets = service
          .ownedByGenderAndSorted('Male', 'Dog', owners);
        expect(onlyMaleOwnerPets.every((pet: Animal) => pet.name === 'Fido')).toBeTruthy();
        expect(onlyMaleOwnerPets.every((pet: Animal) => pet.name === 'Boxer')).toBeFalsy();

        const onlyFemaleOwnerPets = service
          .ownedByGenderAndSorted('Female', 'Dog', owners);
        expect(onlyFemaleOwnerPets.every((pet: Animal) => pet.name === 'Boxer')).toBeTruthy();
        expect(onlyFemaleOwnerPets.every((pet: Animal) => pet.name === 'Fido')).toBeFalsy();
      });

    const mockReq = httpMock.expectOne(environment.endpoint);
    mockReq.flush(mockOwners);
  });

  it('Should sort resulting pet list alphabetically', () => {
    const mockOwners: Owner[] = [
      {
        name: 'Bob',
        gender: 'Male',
        age: 23,
        pets: [
          { name: 'Zaggy', type: 'Dog' },
          { name: 'Albert', type: 'Dog' },
        ]
      },
      {
        name: 'Jennifer',
        gender: 'Female',
        age: 32,
        pets: [
          { name: 'Mittens', type: 'Cat' },
          { name: 'Candy', type: 'Cat' },
        ]
      },
    ];

    const expectedMaleOwnedDogNames: string[] = [
      'Albert',
      'Zaggy',
    ];

    const expectedFemaleOwnedCatNames: string[] = [
      'Candy',
      'Mittens',
    ];

    service
      .getAnimalOwners()
      .subscribe((owners: Owner[]) => {
        const onlyMaleOwnedDogs = service
          .ownedByGenderAndSorted('Male', 'Dog', owners)
          .map((pet: Animal) => pet.name);
        expect(onlyMaleOwnedDogs).toEqual(expectedMaleOwnedDogNames);

        const onlyFemaleOwnedCats = service
          .ownedByGenderAndSorted('Female', 'Cat', owners)
          .map((pet: Animal) => pet.name);
        expect(onlyFemaleOwnedCats).toEqual(expectedFemaleOwnedCatNames);
      });

    const mockReq = httpMock.expectOne(environment.endpoint);
    mockReq.flush(mockOwners);
  });

  it('Should sort all cats alphabetically for both male and female owners', () => {
    const mockOwners: Owner[] = [
      {
        name: 'Bob',
        gender: 'Male',
        age: 23,
        pets: [
          { name: 'Zaggy', type: 'Dog' },
          { name: 'Boxer', type: 'Cat' },
        ]
      },
      {
        name: 'Jennifer',
        gender: 'Female',
        age: 32,
        pets: [
          { name: 'Mittens', type: 'Cat' },
          { name: 'Feathers', type: 'Bird' },
        ]
      },
      {
        name: 'Darren',
        gender: 'Male',
        age: 54,
        pets: [
          { name: 'Sqwarky', type: 'Bird' },
          { name: 'Albert', type: 'Cat' },
        ]
      },
      {
        name: 'Carly',
        gender: 'Female',
        age: 22,
        pets: [
          { name: 'Fluffykins', type: 'Cat' },
          { name: 'Bubbles', type: 'Fish' },
        ]
      },
    ];

    const expectedMaleOwnedCatNames: string[] = [
      'Albert',
      'Boxer',
    ];

    const expectedFemaleOwnedCatNames: string[] = [
      'Fluffykins',
      'Mittens',
    ];

    service
      .getAnimalOwners()
      .subscribe((owners: Owner[]) => {

        const onlyMaleOwnedCats = service
          .ownedByGenderAndSorted('Male', 'Cat', owners)
          .map((pet: Animal) => pet.name);
        expect(onlyMaleOwnedCats).toEqual(expectedMaleOwnedCatNames);

        const onlyFemaleOwnedCats = service
          .ownedByGenderAndSorted('Female', 'Cat', owners)
          .map((pet: Animal) => pet.name);
        expect(onlyFemaleOwnedCats).toEqual(expectedFemaleOwnedCatNames);
      });

    const mockReq = httpMock.expectOne(environment.endpoint);
    mockReq.flush(mockOwners);
  });
});
