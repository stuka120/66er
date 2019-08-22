import { TestBed } from '@angular/core/testing';

import { DownloadsService } from './downloads.facade';

describe('DownloadsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadsService = TestBed.get(DownloadsService);
    expect(service).toBeTruthy();
  });
});
