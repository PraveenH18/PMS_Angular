import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderRegisterationComponent } from './provider-registeration.component';

describe('ProviderRegisterationComponent', () => {
  let component: ProviderRegisterationComponent;
  let fixture: ComponentFixture<ProviderRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderRegisterationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
