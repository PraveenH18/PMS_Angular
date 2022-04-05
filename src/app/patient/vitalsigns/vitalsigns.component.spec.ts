import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsignComponent } from './vitalsigns.component';

describe('VitalsignsComponent', () => {
  let component: VitalsignComponent;
  let fixture: ComponentFixture<VitalsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
