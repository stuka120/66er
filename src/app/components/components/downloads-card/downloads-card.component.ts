import { Component, Input, OnInit } from "@angular/core";
import { DownloadsCardComponentModel } from "./downloads-card.component-model";

@Component({
  selector: "app-downloads-card",
  templateUrl: "./downloads-card.component.html",
  styleUrls: ["./downloads-card.component.css"]
})
export class DownloadsCardComponent implements OnInit {
  @Input()
  model: DownloadsCardComponentModel;

  constructor() {}

  ngOnInit() {}
}
