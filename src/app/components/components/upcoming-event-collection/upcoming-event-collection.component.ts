import { Component, Input, OnInit } from "@angular/core";
import { UpcomingEventCollectionComponentModel } from "./upcoming-event-collection.component-model";

@Component({
  selector: "app-upcoming-event-collection",
  templateUrl: "./upcoming-event-collection.component.html",
  styleUrls: ["./upcoming-event-collection.component.css"]
})
export class UpcomingEventCollectionComponent implements OnInit {
  @Input()
  model: UpcomingEventCollectionComponentModel[];

  constructor() {}

  ngOnInit() {}
}
