import { TestBed } from '@angular/core/testing';

import { CitySelectService } from './city-select.service';

describe('CitySelectService', () => {
  let service: CitySelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitySelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
