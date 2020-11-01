import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AlertComponentModel } from "./alert.component-model";
import { faExclamationTriangle, faInfoCircle, faWindowClose } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent {
  @Input()
  model: AlertComponentModel;

  @Output()
  closeClicked = new EventEmitter<void>();

  faCross = faWindowClose;

  isExpanded = false;

  getAlertIconForActiveMode() {
    return this.model.alertMode === "info" ? faInfoCircle : faExclamationTriangle;
  }

  getIconColorForActiveMode() {
    return this.model.alertMode === "info" ? "darkblue" : "yellow";
  }

  getBackgroundColorClassForActiveMode() {
    return this.model.alertMode === "info" ? "bg-light" : "bg-danger";
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
    this.scrollToTop();
  }

  getExpandButtonText() {
    if (this.isExpanded && !!this.model.expandableSection) {
      return !!this.model?.expandableSection?.collapseButtonText
        ? this.model?.expandableSection?.collapseButtonText
        : "Weitere Infos!";
    }

    if (!this.isExpanded && !!this.model.expandableSection) {
      return !!this.model.expandableSection.expandButtonText
        ? this.model.expandableSection.expandButtonText
        : "Zuklappen!";
    }

    return "Weitere Infos!";
  }

  private scrollToTop() {
    document.getElementById("navbar").scrollIntoView();
  }
}
