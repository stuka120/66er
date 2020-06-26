import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StartDashboardComponent } from "./start-dashboard.component";

describe("StartDashboardComponent", () => {
  let component: StartDashboardComponent;
  let fixture: ComponentFixture<StartDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartDashboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
