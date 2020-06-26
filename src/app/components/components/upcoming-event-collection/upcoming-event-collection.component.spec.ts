import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UpcomingEventCollectionComponent } from "./upcoming-event-collection.component";

describe("UpcomingEventsComponent", () => {
  let component: UpcomingEventCollectionComponent;
  let fixture: ComponentFixture<UpcomingEventCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingEventCollectionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingEventCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
