import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EventCardComponentModel } from "../../components/event-card/event-card.component-model";
import { tap } from "rxjs/operators";
import { MyWordpressFacade } from "../../../shared/facades/my-wordpress.facade";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EventRegistrationOverlayComponent } from "../../overlay/event-registration/event-registration.overlay";

@Component({
  templateUrl: "./event-registration-dashboard.component.html",
  styleUrls: ["./event-registration-dashboard.component.css"]
})
export class EventRegistrationDashboardComponent implements OnInit {
  events$: Observable<EventCardComponentModel[]>;

  constructor(private wordpressFacade: MyWordpressFacade, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.events$ = this.wordpressFacade.getEvents$().pipe(tap(console.log));
  }

  registerEventClicked(eventToRegister: EventCardComponentModel) {
    const component = this.modalService.open(EventRegistrationOverlayComponent, {
      centered: true,
      size: "xl",
      backdrop: true
    });
    const componentInstance = <EventRegistrationOverlayComponent>component.componentInstance;
    componentInstance.eventModel = eventToRegister;
  }
}
