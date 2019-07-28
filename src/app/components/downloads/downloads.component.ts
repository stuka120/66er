import { Component, OnInit } from "@angular/core";
import { WordpressService } from "../../services/wordpress.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-downloads",
  templateUrl: "./downloads.component.html",
  styleUrls: ["./downloads.component.css"]
})
export class DownloadsComponent implements OnInit {
  private htmlContent: any;

  constructor(
    private wordpressService: WordpressService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.wordpressService.getMedia().subscribe(payload => {
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(
        payload[0].content.rendered
      );
    });
  }
}
