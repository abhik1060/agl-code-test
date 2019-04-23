import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalContainerComponent } from './animalContainer.component';
import { AnimalResultComponent } from '../animalResult/animalResult.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnimalContainerComponent', () => {
  let component: AnimalContainerComponent;
  let fixture: ComponentFixture<AnimalContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AnimalContainerComponent, AnimalResultComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
