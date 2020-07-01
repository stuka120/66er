import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { EventCardComponentModel } from "../../components/event-card/event-card.component-model";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { EventRegistrationOverlayComponent } from "../../overlay/event-registration/event-registration.overlay";
import {
  EventRegistrationResultEnum,
  EventRegistrationResultModel
} from "../../overlay/event-registration/event-registration-result.model";
import { Summer2020Facade } from "../../../shared/facades/summer-2020/summer-2020.facade";

@Component({
  templateUrl: "./event-registration-dashboard.component.html",
  styleUrls: ["./event-registration-dashboard.component.css"]
})
export class EventRegistrationDashboardComponent implements OnInit {
  private modalOptions: NgbModalOptions = {
    centered: true,
    size: "md",
    backdrop: true
  };

  events$: Observable<EventCardComponentModel[]>;

  constructor(private summer2020Facade: Summer2020Facade, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.events$ = this.summer2020Facade.getEvents$();
  }

  registerEventClicked(eventToRegister: EventCardComponentModel) {
    const component = this.modalService.open(EventRegistrationOverlayComponent, this.modalOptions);
    const componentInstance = <EventRegistrationOverlayComponent>component.componentInstance;
    componentInstance.eventModel = eventToRegister;

    component.result.then(
      (modalResult) => this.handleModalSuccess(modalResult),
      (modalResult) => this.handleModalError()
    );
  }

  private handleModalSuccess(modalResult: EventRegistrationResultModel) {
    if (isModalResultSuccess()) {
      this.summer2020Facade.createEventRegistration(modalResult.payload);
    }

    function isModalResultSuccess() {
      return (
        modalResult &&
        modalResult.modalResult === EventRegistrationResultEnum.Success &&
        modalResult.payload !== undefined
      );
    }
  }

  private handleModalError() {}

  downloadDetailsPdf(eventModel: EventCardComponentModel) {
    this.summer2020Facade.downloadDetailsPdf(eventModel.pdfUrl);
  }
}
