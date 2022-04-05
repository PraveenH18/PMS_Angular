import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitaluseraccountmanagementComponent } from './hospitaluseraccountmanagement.component';

describe('HospitaluseraccountmanagementComponent', () => {
  let component: HospitaluseraccountmanagementComponent;
  let fixture: ComponentFixture<HospitaluseraccountmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitaluseraccountmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitaluseraccountmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
