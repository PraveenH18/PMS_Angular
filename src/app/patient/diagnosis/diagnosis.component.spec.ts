import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisPComponent } from './diagnosis.component';

describe('DiagnosisComponent', () => {
  let component: DiagnosisPComponent;
  let fixture: ComponentFixture<DiagnosisPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
