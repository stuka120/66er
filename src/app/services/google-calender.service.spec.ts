import { TestBed } from '@angular/core/testing';

import { GoogleCalenderService } from './google-calender.service';

describe('GoogleCalenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleCalenderService = TestBed.get(GoogleCalenderService);
    expect(service).toBeTruthy();
  });
});
