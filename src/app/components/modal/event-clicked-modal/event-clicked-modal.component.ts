import { Component, Input } from "@angular/core";
import { EventClickedModalModel } from "./event-clicked-modal.model";
import {
  faCalendarDay, faClock, faHeading,
  faLocationArrow
} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: "./event-clicked-modal.component.html"
})
export class EventClickedModalComponent {
  faHeading = faHeading;
  faLocationArrow = faLocationArrow;
  faClock = faClock;

  @Input()
  model: EventClickedModalModel;
}
