import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationformComponent } from './medicationform.component';

describe('MedicationformComponent', () => {
  let component: MedicationformComponent;
  let fixture: ComponentFixture<MedicationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
