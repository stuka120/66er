import { Component, Input, OnInit } from "@angular/core";
import { DownloadsCardModel } from "./downloads-card.model";

@Component({
  selector: "app-downloads-card",
  templateUrl: "./downloads-card.component.html",
  styleUrls: ["./downloads-card.component.css"]
})
export class DownloadsCardComponent implements OnInit {
  @Input()
  model: DownloadsCardModel;

  constructor() {}

  ngOnInit() {}
}
