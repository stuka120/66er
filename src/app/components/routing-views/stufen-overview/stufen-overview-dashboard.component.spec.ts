import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StufenOverviewDashboardComponent } from "./stufen-overview-dashboard.component";

describe("StufenOverviewDashboardComponent", () => {
  let component: StufenOverviewDashboardComponent;
  let fixture: ComponentFixture<StufenOverviewDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StufenOverviewDashboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StufenOverviewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
