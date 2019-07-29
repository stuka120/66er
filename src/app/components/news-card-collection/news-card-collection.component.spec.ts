import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardCollectionComponent } from './news-card-collection.component';

describe('NewsCardCollectionComponent', () => {
  let component: NewsCardCollectionComponent;
  let fixture: ComponentFixture<NewsCardCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCardCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
