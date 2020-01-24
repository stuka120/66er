import { Component, EventEmitter, Output } from "@angular/core";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

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
}
