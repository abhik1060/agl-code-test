import { Animal } from '../animal/animal';

export type Gender = 'Male' | 'Female';

export class Owner {
  name: string;
  animals: Animal[];
  gender: Gender;
  age: number;
}
