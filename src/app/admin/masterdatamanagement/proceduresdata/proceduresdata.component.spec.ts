import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresdataComponent } from './proceduresdata.component';

describe('ProceduresdataComponent', () => {
  let component: ProceduresdataComponent;
  let fixture: ComponentFixture<ProceduresdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceduresdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceduresdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
