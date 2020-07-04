import { Component, Input, OnInit } from "@angular/core";
import { EventRegistrationModalPayload } from "../event-registration/event-registration-result.model";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EventCardComponentModel } from "../../components/event-card/event-card.component-model";

@Component({
  templateUrl: "./event-registration-confirmation.overlay.html",
  styleUrls: ["./event-registration-confirmation.overlay.css"]
})
export class EventRegistrationConfirmationOverlayComponent implements OnInit {
  @Input()
  eventRegistrationPayload: EventRegistrationModalPayload;

  @Input()
  eventModel: EventCardComponentModel;

  constructor(private activeModal: NgbActiveModal) {}

  ngOnInit() {}

  closeClicked() {
    this.activeModal.close();
  }
}
