import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientuseraccountmanagementComponent } from './patientuseraccountmanagement.component';

describe('PatientuseraccountmanagementComponent', () => {
  let component: PatientuseraccountmanagementComponent;
  let fixture: ComponentFixture<PatientuseraccountmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientuseraccountmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientuseraccountmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
