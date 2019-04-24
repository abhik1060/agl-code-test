import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalResultComponent } from './animalResult.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Animal } from 'src/app/models/animal/animal';

describe('AnimalResultComponent', () => {
  let component: AnimalResultComponent;
  let fixture: ComponentFixture<AnimalResultComponent>;
  let titleEl: DebugElement;
  let listEl: DebugElement;

  const pets: Animal[] = [
    { name: 'Goldy', type: 'Fish' },
    { name: 'Gimmy', type: 'Bird' },
    { name: 'Tommy', type: 'Dog' },
    { name: 'Mittens', type: 'Cat' },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalResultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    titleEl = fixture.debugElement.query(By.css('h3'));
    listEl = fixture.debugElement.query(By.css('ol'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render title', () => {
    let titleText = '';
    component.title = titleText;
    fixture.detectChanges();
    expect(titleEl.nativeElement.innerHTML === titleText).toBeTruthy();
    expect(titleEl.nativeElement.innerHTML === 'Male').toBeFalsy();

    titleText = 'Male';
    component.title = titleText;
    fixture.detectChanges();
    expect(titleEl.nativeElement.innerHTML === titleText).toBeTruthy();
    expect(titleEl.nativeElement.innerHTML === 'Female').toBeFalsy();

    titleText = 'Female';
    component.title = titleText;
    fixture.detectChanges();
    expect(titleEl.nativeElement.innerHTML === titleText).toBeTruthy();
    expect(titleEl.nativeElement.innerHTML === '').toBeFalsy();
  });
});
