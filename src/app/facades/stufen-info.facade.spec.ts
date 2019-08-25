import { TestBed } from '@angular/core/testing';

describe('StufenInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StufenInfoService = TestBed.get(StufenInfoService);
    expect(service).toBeTruthy();
  });
});
