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
    this.upcomingEvents$ = this.eventsFacade.getUpomingEventsForNextMonth();
  }
}
