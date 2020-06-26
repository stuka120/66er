import { Component, Input, OnInit } from "@angular/core";
import { StufenCardModel } from "../stufen-card/stufen-card.model";

@Component({
  selector: "app-stufen-card-collection",
  templateUrl: "./stufen-card-collection.component.html",
  styleUrls: ["./stufen-card-collection.component.css"]
})
export class StufenCardCollectionComponent implements OnInit {
  @Input() stufenModels: StufenCardModel[];

  constructor() {}

  ngOnInit() {}
}
