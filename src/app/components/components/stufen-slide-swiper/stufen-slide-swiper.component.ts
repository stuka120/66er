import { Component, OnInit, Input, ViewChild, Inject } from "@angular/core";
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperDirective } from "ngx-swiper-wrapper";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BreakpointService } from "../../../shared/services/breakpoint.service";
import { StufenCardModel } from "../../../shared/model/stufen-card.model";

@Component({
  selector: "app-stufen-slide-swiper",
  templateUrl: "./stufen-slide-swiper.component.html",
  styleUrls: ["./stufen-slide-swiper.component.css"]
})
export class StufenSlideSwiperComponent implements OnInit {
  @Input() stufenModels: StufenCardModel[];

  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;

  config$: Observable<SwiperConfigInterface>;

  constructor(
    @Inject(SWIPER_CONFIG) public config: SwiperConfigInterface,
    private breakpointService: BreakpointService
  ) {
    this.config$ = this.breakpointService
      .isBreakpointMatched("md-down")
      .pipe(map((isMatched) => ({ ...config, autoplay: isMatched } as SwiperConfigInterface)));
  }

  ngOnInit() {}
}
