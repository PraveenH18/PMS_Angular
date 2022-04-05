import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientuserDetailsComponent } from './patientuser-details.component';

describe('PatientuserDetailsComponent', () => {
  let component: PatientuserDetailsComponent;
  let fixture: ComponentFixture<PatientuserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientuserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientuserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
