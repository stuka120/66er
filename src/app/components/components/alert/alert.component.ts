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

  isExpanded: boolean = false;

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

  toggleExpand() {
    if (this.isExpanded) {
      this.scrollToTop();
    }
    this.isExpanded = !this.isExpanded;
  }

  getExpandButtonText() {
    if (this.isExpanded && !!this.model.expandableSection) {
      return !!this.model?.expandableSection?.collapseButtonText ? this.model?.expandableSection?.collapseButtonText : "Weitere Infos!"
    }

    if (!this.isExpanded && !!this.model.expandableSection) {
      return !!this.model.expandableSection.expandButtonText ? this.model.expandableSection.expandButtonText : "Zuklappen!";
    }

    return "Weitere Infos!";
  }

  private scrollToTop() {
    document.getElementById("navbar").scrollIntoView();
  }
}
