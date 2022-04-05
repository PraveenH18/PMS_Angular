import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureformComponent } from './procedureform.component';

describe('ProcedureformComponent', () => {
  let component: ProcedureformComponent;
  let fixture: ComponentFixture<ProcedureformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
