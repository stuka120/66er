import { TestBed } from '@angular/core/testing';

import { MyFacebookFacade } from './my-facebook.service';

describe('MyFacebookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyFacebookFacade = TestBed.get(MyFacebookFacade);
    expect(service).toBeTruthy();
  });
});
