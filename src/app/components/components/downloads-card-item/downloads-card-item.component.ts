import { Component, Input, OnInit } from "@angular/core";
import { DownloadModel } from "../../../model/responses/wordpress-media-response.model";

@Component({
  selector: "app-downloads-card-item",
  templateUrl: "./downloads-card-item.component.html",
  styleUrls: ["./downloads-card-item.component.css"]
})
export class DownloadsCardItemComponent implements OnInit {
  @Input()
  model: DownloadModel;

  constructor() {}

  ngOnInit() {}
}
