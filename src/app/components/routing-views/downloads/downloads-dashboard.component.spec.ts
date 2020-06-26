import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DownloadsDashboardComponent } from "./downloads-dashboard.component";

describe("DownloadsComponent", () => {
  let component: DownloadsDashboardComponent;
  let fixture: ComponentFixture<DownloadsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadsDashboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
