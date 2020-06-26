import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EventCardComponentModel } from "../../components/event-card/event-card.component-model";
import { tap } from "rxjs/operators";
import { MyWordpressFacade } from "../../../shared/facades/my-wordpress.facade";

@Component({
  templateUrl: "./event-registration-dashboard.component.html",
  styleUrls: ["./event-registration-dashboard.component.css"]
})
export class EventRegistrationDashboardComponent implements OnInit {
  events$: Observable<EventCardComponentModel[]>;

  constructor(private wordpressFacade: MyWordpressFacade) {}

  ngOnInit(): void {
    this.events$ = this.wordpressFacade.getEvents$().pipe(tap(console.log));
  }
}
