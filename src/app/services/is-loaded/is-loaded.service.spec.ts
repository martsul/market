import { TestBed } from '@angular/core/testing';

import { IsLoadedServiceService } from './is-loaded.service';

describe('IsLoadedServiceService', () => {
  let service: IsLoadedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsLoadedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
