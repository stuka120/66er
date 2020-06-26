import { Component, OnInit, Input } from "@angular/core";
import { StufenCardModel } from "../stufen-card/stufen-card.model";

@Component({
  selector: "app-stufen-slide",
  templateUrl: "./stufen-slide.component.html",
  styleUrls: ["./stufen-slide.component.css"]
})
export class StufenSlideComponent implements OnInit {
  @Input() stufenCardModel: StufenCardModel;

  constructor() {}

  ngOnInit() {}
}
