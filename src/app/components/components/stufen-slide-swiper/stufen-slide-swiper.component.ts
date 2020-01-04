import {Component, OnInit, Input, ViewChild, Inject} from "@angular/core";
import {StufenCardModel} from "../../../model/stufen-card.model";
import {
  SWIPER_CONFIG,
  SwiperConfigInterface,
  SwiperDirective
} from "ngx-swiper-wrapper";
import {Observable} from "rxjs";
import {BreakpointService} from "../../../services/breakpoint.service";
import {map} from "rxjs/operators";

@Component({
  selector: "app-stufen-slide-swiper",
  templateUrl: "./stufen-slide-swiper.component.html",
  styleUrls: ["./stufen-slide-swiper.component.css"]
})
export class StufenSlideSwiperComponent implements OnInit {
  @Input() stufenModels: StufenCardModel[];

  @ViewChild(SwiperDirective, {static: false}) directiveRef?: SwiperDirective;

  config$: Observable<SwiperConfigInterface>;

  constructor(@Inject(SWIPER_CONFIG) public config: SwiperConfigInterface, private breakpointService: BreakpointService) {
    this.config$ = this.breakpointService.isBreakpointMatched("md-down").pipe(
      map(isMatched => ({...config, autoplay: isMatched} as SwiperConfigInterface))
    );
  }

  ngOnInit() {
  }

}
