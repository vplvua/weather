import { TestBed } from '@angular/core/testing';

import { FetchDataInterceptor } from './fetch-data.interceptor';

describe('FetchDataInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FetchDataInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FetchDataInterceptor = TestBed.inject(FetchDataInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
