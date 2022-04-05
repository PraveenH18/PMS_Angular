import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsignsComponent } from './vitalsigns.component';

describe('VitalsignsComponent', () => {
  let component: VitalsignsComponent;
  let fixture: ComponentFixture<VitalsignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
