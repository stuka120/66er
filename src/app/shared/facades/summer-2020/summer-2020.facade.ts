import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EventCardComponentModel } from "../../../components/components/event-card/event-card.component-model";
import { map } from "rxjs/operators";
import { SummerEventService } from "../../services/summer-event/summer-event.service";
import { EventRegistrationModalPayload } from "../../../components/overlay/event-registration/event-registration-result.model";
import { WINDOW } from "ngx-window-token";

@Injectable()
export class Summer2020Facade {
  constructor(private summerEventService: SummerEventService, @Inject(WINDOW) private window: Window) {}

  getEvents$(): Observable<EventCardComponentModel[]> {
    return this.summerEventService.getEvents$().pipe(
      map((response) =>
        response.map((item) => ({
          id: item.id,
          name: item.name,
          summary: item.summary,
          stufen: item.stufen,
          description: item.description,
          imageUrl: item.imageUrl,
          pdfUrl: item.pdfUrl,
          eventDate: item.eventDate,
          eventStartTime: item.eventStartTime,
          eventEndTime: item.eventEndTime,
          registrationFrom: item.registrationFrom,
          registrationTo: item.registrationTo
        }))
      )
    );
  }

  createEventRegistration(eventRegistration: EventRegistrationModalPayload) {
    this.summerEventService
      .registerForEvent$({
        eventId: eventRegistration.eventId,
        firstName: eventRegistration.firstname,
        lastName: eventRegistration.lastname
      })
      .subscribe();
  }

  downloadDetailsPdf(eventPdfUrl: string) {
    this.window.open(eventPdfUrl, "_blank");
  }
}
