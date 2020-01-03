import { Component, Input, OnInit } from "@angular/core";
import { UpcomingEventModel } from "./upcoming-event.model";

@Component({
  selector: "app-upcoming-events",
  templateUrl: "./upcoming-events.component.html",
  styleUrls: ["./upcoming-events.component.css"]
})
export class UpcomingEventsComponent implements OnInit {
  @Input()
  model: UpcomingEventModel[];

  constructor() {}

  ngOnInit() {}
}
