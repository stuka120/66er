import {Component, OnInit, Input, ViewChild, Inject} from "@angular/core";
import {StufenCardModel} from "../../model/stufen-card.model";
import {
  SWIPER_CONFIG,
  SwiperConfigInterface,
  SwiperDirective
} from "ngx-swiper-wrapper";

@Component({
  selector: "app-stufen-slide-swiper",
  templateUrl: "./stufen-slide-swiper.component.html",
  styleUrls: ["./stufen-slide-swiper.component.css"]
})
export class StufenSlideSwiperComponent implements OnInit {
  @Input() stufenModels: StufenCardModel[];

  @ViewChild(SwiperDirective, {static: false}) directiveRef?: SwiperDirective;

  constructor(@Inject(SWIPER_CONFIG) public config: SwiperConfigInterface) {
  }

  ngOnInit() {
  }

}
