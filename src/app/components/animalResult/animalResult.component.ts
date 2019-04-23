import { Component, OnInit, Input } from '@angular/core';
import { Animal } from 'src/app/models/animal/animal';

@Component({
  selector: 'app-animal-result',
  templateUrl: './animalResult.component.html',
  styleUrls: ['./animalResult.component.css']
})
export class AnimalResultComponent implements OnInit {
  
  @Input() animals: Animal[];
  @Input() title: string;
  

  constructor() { }

  ngOnInit() { }
}
