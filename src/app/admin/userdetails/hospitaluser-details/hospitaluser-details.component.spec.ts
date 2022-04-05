import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitaluserDetailsComponent } from './hospitaluser-details.component';

describe('HospitaluserDetailsComponent', () => {
  let component: HospitaluserDetailsComponent;
  let fixture: ComponentFixture<HospitaluserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitaluserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitaluserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
