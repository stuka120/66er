import { Component, Inject, OnInit } from "@angular/core";
import { iif, Observable } from "rxjs";
import { EventCardComponentModel } from "../../components/event-card/event-card.component-model";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { EventRegistrationOverlayComponent } from "../../overlay/event-registration/event-registration.overlay";
import {
  EventRegistrationModalPayload,
  EventRegistrationResultEnum,
  EventRegistrationResultModel
} from "../../overlay/event-registration/event-registration-result.model";
import { Summer2020Facade } from "../../../shared/facades/summer-2020/summer-2020.facade";
import { SESSION_STORAGE, StorageService, StorageTranscoders } from "ngx-webstorage-service";
// tslint:disable-next-line:max-line-length
import { EventRegistrationConfirmationOverlayComponent } from "../../overlay/event-registration-confirmation/event-registration-confirmation.overlay";
import { ActivatedRoute } from "@angular/router";

@Component({
  templateUrl: "./event-registration-dashboard.component.html",
  styleUrls: ["./event-registration-dashboard.component.css"]
})
export class EventRegistrationDashboardComponent implements OnInit {
  private sessionStorageKey = "REGISTRATION_INFO";

  private modalOptions: NgbModalOptions = {
    centered: true,
    size: "md",
    backdrop: true
  };

  private readonly isDisplayingAllEvents = false;

  events$: Observable<EventCardComponentModel[]>;

  constructor(
    private summer2020Facade: Summer2020Facade,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    @Inject(SESSION_STORAGE) private storageService: StorageService
  ) {
    this.isDisplayingAllEvents = this.activatedRoute.snapshot.data.displayAllEvents ?? false;
  }

  ngOnInit(): void {
    this.events$ = iif(
      () => this.isDisplayingAllEvents,
      this.summer2020Facade.getAllEvents$(),
      this.summer2020Facade.getEvents$()
    );
  }

  registerEventClicked(eventToRegister: EventCardComponentModel) {
    const component = this.modalService.open(EventRegistrationOverlayComponent, this.modalOptions);
    const componentInstance = <EventRegistrationOverlayComponent>component.componentInstance;
    componentInstance.eventModel = eventToRegister;
    componentInstance.setFormGroupValues(
      this.storageService.get<EventRegistrationModalPayload>(this.sessionStorageKey, StorageTranscoders.JSON)
    );

    component.result.then(
      (modalResult) => this.handleModalSuccess(modalResult),
      () => this.handleModalError()
    );
  }

  private handleModalSuccess(modalResult: EventRegistrationResultModel) {
    if (isModalResultSuccess()) {
      this.summer2020Facade.createEventRegistration$(modalResult.payload).subscribe(() => {
        this.storageService.set(this.sessionStorageKey, modalResult.payload, StorageTranscoders.JSON);

        const component = this.modalService.open(EventRegistrationConfirmationOverlayComponent, this.modalOptions);
        const componentInstance = <EventRegistrationConfirmationOverlayComponent>component.componentInstance;
        componentInstance.eventModel = modalResult.associatedEventCard;
        componentInstance.eventRegistrationPayload = modalResult.payload;
      });
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
