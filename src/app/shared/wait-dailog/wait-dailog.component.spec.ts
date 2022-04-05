import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitDailogComponent } from './wait-dailog.component';

describe('WaitDailogComponent', () => {
  let component: WaitDailogComponent;
  let fixture: ComponentFixture<WaitDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitDailogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
