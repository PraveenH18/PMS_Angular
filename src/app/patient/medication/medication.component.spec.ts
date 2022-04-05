import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationPComponent } from './medication.component';

describe('MedicationComponent', () => {
  let component: MedicationPComponent;
  let fixture: ComponentFixture<MedicationPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
