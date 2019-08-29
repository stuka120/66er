import { Component, OnInit } from "@angular/core";
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-upcoming-events",
  templateUrl: "./upcoming-events.component.html",
  styleUrls: ["./upcoming-events.component.css"]
})
export class UpcomingEventsComponent implements OnInit {
  faCalendarCheck = faCalendarCheck;

  constructor() {}

  ngOnInit() {}
}
