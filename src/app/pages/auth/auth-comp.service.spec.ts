import { TestBed } from '@angular/core/testing';

import { AuthCompService } from './auth-comp.service';

describe('AuthCompService', () => {
  let service: AuthCompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
