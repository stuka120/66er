import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StufenCardCollectionComponent } from "./stufen-card-collection.component";

describe("StufenCardCollectionComponent", () => {
  let component: StufenCardCollectionComponent;
  let fixture: ComponentFixture<StufenCardCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StufenCardCollectionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StufenCardCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
