import { TestBed } from "@angular/core/testing";

import { MyFacebookService } from "./my-facebook.service";

describe("FacebookService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: MyFacebookService = TestBed.get(MyFacebookService);
    expect(service).toBeTruthy();
  });
});
