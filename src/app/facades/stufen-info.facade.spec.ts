import { TestBed } from '@angular/core/testing';

import { StufenInfoService } from './stufen-info.service';

describe('StufenInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StufenInfoService = TestBed.get(StufenInfoService);
    expect(service).toBeTruthy();
  });
});
