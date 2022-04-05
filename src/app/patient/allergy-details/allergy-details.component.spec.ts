import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergyDetailsComponent } from './allergy-details.component';

describe('AllergyDetailsComponent', () => {
  let component: AllergyDetailsComponent;
  let fixture: ComponentFixture<AllergyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
