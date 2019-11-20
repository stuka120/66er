import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StufenSlideComponent } from './stufen-slide.component';

describe('StufenSlideComponent', () => {
  let component: StufenSlideComponent;
  let fixture: ComponentFixture<StufenSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StufenSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StufenSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
