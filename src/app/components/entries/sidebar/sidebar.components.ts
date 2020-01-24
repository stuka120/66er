import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { UpcomingEventModel } from "../../components/upcoming-event-collection/upcoming-event.model";
import { EventsFacade } from "../../../facades/events.facade";
import { map } from "rxjs/operators";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.components.html",
  styleUrls: ["./sidebar.components.css"]
})
export class SidebarComponent implements OnInit {
  faArrowLeft = faArrowLeft;

  upcomingEvents$: Observable<UpcomingEventModel[]>;

  @Output()
  sidebarCloseClicked = new EventEmitter<void>();

  constructor(private eventsFacade: EventsFacade) {}

  ngOnInit(): void {
    let nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    this.upcomingEvents$ = this.eventsFacade
      .getGoogleCalenderEventsUntil(nextMonth)
      .pipe(
        map(events =>
          events
            .map(
              event =>
                <UpcomingEventModel>{
                  title: event.summary,
                  dateTime: event.start.dateTime,
                  endDateTime: event.end.dateTime,
                  place: event.location
                }
            )
            .sort(
              (a, b) =>
                new Date(a.dateTime).valueOf() - new Date(b.dateTime).valueOf()
            )
        )
      );
  }
}
