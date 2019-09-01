import { TestBed } from '@angular/core/testing';

import { EventsFacade } from './events.facade';

describe('EventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsFacade = TestBed.get(EventsFacade);
    expect(service).toBeTruthy();
  });
});
