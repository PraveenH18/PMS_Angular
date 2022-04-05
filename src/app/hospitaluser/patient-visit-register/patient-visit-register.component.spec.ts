import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVisitRegisterComponent } from './patient-visit-register.component';

describe('PatientVisitRegisterComponent', () => {
  let component: PatientVisitRegisterComponent;
  let fixture: ComponentFixture<PatientVisitRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientVisitRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVisitRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
