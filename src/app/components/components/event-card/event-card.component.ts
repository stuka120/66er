import {Component, OnInit} from "@angular/core";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faArrowDown, faCalendar, faChevronDown, faChevronUp, faClock, faList} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-event-card",
  templateUrl: "./event-card.component.html",
  styleUrls: ["./event-card.component.css"]
})

export class EventCardComponent implements OnInit {

  // @ts-ignore
  faList = faList;
  faClock = faClock;
  faCalendar = faCalendar;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  isExpanded: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
