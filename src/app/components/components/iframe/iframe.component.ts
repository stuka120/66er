import {Component, Input} from "@angular/core";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: "app-iframe",
  templateUrl: "./iframe.component.html",
  styleUrls: ["./iframe.component.css"]
})
export class IframeComponent {
  private safeResourceUrl: SafeResourceUrl;

  @Input()
  set url(value: string) {
   this.safeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  get url(): string {
    return this.safeResourceUrl.toString();
  }

  @Input()
  width = 600;

  @Input()
  height = 450;

  constructor(private sanitizer: DomSanitizer) {
  }
}
