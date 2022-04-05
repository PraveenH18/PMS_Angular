import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaglogformComponent } from './diaglogform.component';

describe('DiaglogformComponent', () => {
  let component: DiaglogformComponent;
  let fixture: ComponentFixture<DiaglogformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaglogformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaglogformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
