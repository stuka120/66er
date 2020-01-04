import {Component, Input} from "@angular/core";
import {UpcomingEventModel} from "../upcoming-event-collection/upcoming-event.model";
import { faClock, faLocationArrow } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-upcoming-event",
  templateUrl: "./upcoming-event.component.html",
  styleUrls: ["./upcoming-event.component.css"]
})
export class UpcomingEventComponent {
  @Input()
  upcomingEvent: UpcomingEventModel;

  faClock = faClock;
  faLocationArrow = faLocationArrow;

  get untilDateFormattingString(): string {
    return new Date(this.upcomingEvent.dateTime).getDate() === new Date(this.upcomingEvent.endDateTime).getDate() ? "HH:mm" : "EEEE HH:mm";
  }
}
