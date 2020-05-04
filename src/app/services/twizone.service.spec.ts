import { TestBed } from '@angular/core/testing';

import { TwizoneService } from './twizone.service';

describe('TwizoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwizoneService = TestBed.get(TwizoneService);
    expect(service).toBeTruthy();
  });
});
