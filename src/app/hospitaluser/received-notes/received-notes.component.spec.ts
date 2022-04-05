import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedNotesComponent } from './received-notes.component';

describe('ReceivedNotesComponent', () => {
  let component: ReceivedNotesComponent;
  let fixture: ComponentFixture<ReceivedNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
