import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationdataComponent } from './medicationdata.component';

describe('MedicationdataComponent', () => {
  let component: MedicationdataComponent;
  let fixture: ComponentFixture<MedicationdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
