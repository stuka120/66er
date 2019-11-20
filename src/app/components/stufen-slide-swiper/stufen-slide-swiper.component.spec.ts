import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StufenSlideSwiperComponent } from './stufen-slide-swiper.component';

describe('StufenSlideSwiperComponent', () => {
  let component: StufenSlideSwiperComponent;
  let fixture: ComponentFixture<StufenSlideSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StufenSlideSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StufenSlideSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
