import { Component, OnInit } from "@angular/core";
import { DownloadModel } from "src/app/model/wordpress-media-response.dto";
import { Observable } from "rxjs";
import { DownloadsFacade } from "../../facades/downloads.facade";

@Component({
  selector: "app-downloads",
  templateUrl: "./downloads-dashboard.component.html",
  styleUrls: ["./downloads-dashboard.component.css"]
})
export class DownloadsDashboardComponent implements OnInit {
  currentDownloads$: Observable<DownloadModel[]>;

  constructor(private downloadsFacade: DownloadsFacade) {}

  ngOnInit() {
    this.currentDownloads$ = this.downloadsFacade.currentDownloads$;
  }
}
