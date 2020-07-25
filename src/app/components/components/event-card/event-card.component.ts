import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faCalendar, faChevronDown, faChevronUp, faClock, faList } from "@fortawesome/free-solid-svg-icons";
import { EventCardComponentModel } from "./event-card.component-model";
import * as moment from "moment";

@Component({
  selector: "app-event-card",
  templateUrl: "./event-card.component.html",
  styleUrls: ["./event-card.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardComponent implements OnInit {
  @Input()
  model: EventCardComponentModel;

  @Output()
  registerClicked = new EventEmitter<EventCardComponentModel>();

  @Output()
  downloadDetailsPdfClicked = new EventEmitter<EventCardComponentModel>();

  // @ts-ignore
  faList = faList;
  faClock = faClock;
  faCalendar = faCalendar;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  isExpanded: boolean;

  constructor() {}

  ngOnInit() {}

  isRegistrationOpen() {
    const currentMoment = moment();

    if (!!this.model.registrationFrom && !!this.model.registrationTo) {
      const registrationFromMoment = moment(this.model.registrationFrom);
      const registrationToMoment = moment(this.model.registrationTo);

      return currentMoment.isAfter(registrationFromMoment) && currentMoment.isBefore(registrationToMoment);
    }

    if (!!this.model.registrationFrom && !this.model.registrationTo) {
      const registrationFromMoment = moment(this.model.registrationFrom);

      return currentMoment.isAfter(registrationFromMoment);
    }

    if (!this.model.registrationFrom && !!this.model.registrationTo) {
      const registrationToMoment = moment(this.model.registrationTo);

      return currentMoment.isBefore(registrationToMoment);
    }

    return true;
  }
}
