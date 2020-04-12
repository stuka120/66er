import { Component, Input } from "@angular/core";
import { AlertComponentModel } from "./alert.component-model";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent {
  @Input()
  model: AlertComponentModel;
}
