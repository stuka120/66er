import { Component, Input } from "@angular/core";

@Component({
  selector: "app-loading-image",
  templateUrl: "./loading-image.component.html",
  styleUrls: ["./loading-image.component.css"]
})
export class LoadingImage {
  @Input()
  src: string;

  @Input()
  width: number | "auto" = "auto";

  @Input()
  height: number | "auto" = "auto";

  @Input()
  objectFit: "contain" | "cover" | "fill" | "none" | "scale-dow" = "none";

  imageLoaded = false;
}
