import { TestBed } from '@angular/core/testing';

import { HospitaluserService } from './hospitaluser.service';

describe('HospitaluserService', () => {
  let service: HospitaluserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitaluserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
