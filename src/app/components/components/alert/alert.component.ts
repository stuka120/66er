import { Component, Input } from "@angular/core";
import { AlertModel } from "./alert.model";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent {
  @Input()
  model: AlertModel;
}
