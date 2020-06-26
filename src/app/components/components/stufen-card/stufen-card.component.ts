import { Component, OnInit, Input } from "@angular/core";
import { StufenCardModel } from "./stufen-card.model";

@Component({
  selector: "app-stufen-card",
  templateUrl: "./stufen-card.component.html",
  styleUrls: ["./stufen-card.component.css"]
})
export class StufenCardComponent implements OnInit {
  @Input() stufenCardModel: StufenCardModel;

  constructor() {}

  ngOnInit() {}
}
