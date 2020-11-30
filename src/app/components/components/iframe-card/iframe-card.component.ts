import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IframeCardModel } from "./iframe-card.model";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-iframe-card",
  templateUrl: "iframe-card.component.html",
  styleUrls: ["./iframe-card.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IframeCardComponent {
  @Input()
  model: IframeCardModel;

  constructor(private domSanitizer: DomSanitizer) {}

  getIframeUrl() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.model.iframe.url);
  }

  getIframeHeight() {
    return this.model.iframe.height ?? "auto";
  }

  getIframeWidth() {
    return this.model.iframe.width ?? "auto";
  }
}
