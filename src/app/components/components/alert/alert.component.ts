import { Component, Input } from "@angular/core";
import { AlertComponentModel } from "./alert.component-model";
import {
  faExclamationTriangle,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent {
  @Input()
  model: AlertComponentModel;

  getAlertIconForActiveMode() {
    return this.model.alertMode === "info"
      ? faInfoCircle
      : faExclamationTriangle;
  }

  getIconColorForActiveMode() {
    return this.model.alertMode === "info" ? "darkblue" : "yellow";
  }

  getBackgroundColorClassForActiveMode() {
    return this.model.alertMode === "info" ? "bg-light" : "bg-danger";
  }
}
