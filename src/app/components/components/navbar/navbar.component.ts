import { Component, EventEmitter, Output } from "@angular/core";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { ConfigurationService } from "../../../shared/services/configuration/configuration.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
  isMenuCollapsed = true;

  faCalenderCheck = faCalendarCheck;

  @Output()
  calendarButtonClicked = new EventEmitter<void>();

  constructor(private configurationService: ConfigurationService) {}

  isSummer2020Visible$() {
    return this.configurationService.getConfig$().pipe(map((config) => !!config?.showSummer2020Events ?? false));
  }
}
