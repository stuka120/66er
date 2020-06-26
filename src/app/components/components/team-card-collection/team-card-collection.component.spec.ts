import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TeamCardCollectionComponent } from "./team-card-collection.component";

describe("TeamCardCollectionComponent", () => {
  let component: TeamCardCollectionComponent;
  let fixture: ComponentFixture<TeamCardCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamCardCollectionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCardCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
