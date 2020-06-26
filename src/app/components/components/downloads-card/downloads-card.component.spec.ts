import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DownloadsCardComponent } from "./downloads-card.component";

describe("DownloadsCardComponent", () => {
  let component: DownloadsCardComponent;
  let fixture: ComponentFixture<DownloadsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadsCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
