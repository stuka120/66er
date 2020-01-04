import { Component, Input, OnInit } from "@angular/core";
import { DownloadModel } from "../../../model/wordpress-media-response.dto";

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
