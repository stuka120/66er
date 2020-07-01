import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EventCardComponentModel } from "../../../components/components/event-card/event-card.component-model";
import { map } from "rxjs/operators";
import { SummerEventService } from "../../services/summer-event/summer-event.service";
import { EventRegistrationModalPayload } from "../../../components/overlay/event-registration/event-registration-result.model";

@Injectable()
export class Summer2020Facade {
  constructor(private summerEventService: SummerEventService) {}

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
}
