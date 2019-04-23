import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalPageComponent } from './petPage.component';
import { AnimalResultComponent } from '../animalResult/animalResult.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AnimalPageComponent', () => {
  let component: AnimalPageComponent;
  let fixture: ComponentFixture<AnimalPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AnimalPageComponent, AnimalResultComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
