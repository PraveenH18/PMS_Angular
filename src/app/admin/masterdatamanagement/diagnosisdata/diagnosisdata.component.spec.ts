import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisdataComponent } from './diagnosisdata.component';

describe('DiagnosisdataComponent', () => {
  let component: DiagnosisdataComponent;
  let fixture: ComponentFixture<DiagnosisdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
