import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EventCardComponentModel } from "../../../components/components/event-card/event-card.component-model";
import { map, withLatestFrom } from "rxjs/operators";
import { SummerEventService } from "../../services/summer-event/summer-event.service";
// tslint:disable-next-line:max-line-length
import { EventRegistrationModalPayload } from "../../../components/overlay/event-registration/event-registration-result.model";
import { WINDOW } from "ngx-window-token";
import * as moment from "moment";
import { ConfigurationService } from "../../services/configuration/configuration.service";
import { AppConfig } from "../../model/config/app.config";

@Injectable()
export class Summer2020Facade {
  constructor(
    private summerEventService: SummerEventService,
    private configurationService: ConfigurationService,
    @Inject(WINDOW) private window: Window
  ) {}

  getEvents$(): Observable<EventCardComponentModel[]> {
    const currentMoment = moment();

    return this.summerEventService.getEvents$().pipe(
      withLatestFrom(this.configurationService.getConfig$()),
      map(([response, config]) =>
        response
          .map((item) => ({
            id: item.id,
            name: item.name,
            summary: item.summary,
            stufen: item.stufen,
            description: item.description,
            imageUrl: item.imageUrl,
            pdfUrl: item.pdfUrl,
            eventDate: new Date(item.eventDate),
            eventStartTime: new Date(item.eventStartTime),
            eventEndTime: new Date(item.eventEndTime),
            registrationFrom: item.registrationFrom ? new Date(item.registrationFrom) : undefined,
            registrationTo: item.registrationTo ? new Date(item.registrationTo) : undefined,
            price: item.price ?? undefined
          }))
          // tslint:disable-next-line
          .filter(function (event) {
            return (
              (config?.summer2020?.useRegistrationTimeFrame && validateResponseItemVisibility(event)) ||
              !config?.summer2020?.useRegistrationTimeFrame
            );
          })
          .sort(
            (a, b) =>
              a.eventDate.setTime(a.eventStartTime.getTime()).valueOf() -
              b.eventDate.setTime(b.eventStartTime.getTime()).valueOf()
          )
      )
    );

    function validateResponseItemVisibility(model: EventCardComponentModel) {
      if (!!model.registrationFrom && !!model.registrationTo) {
        const registrationFromMoment = moment(model.registrationFrom);
        const registrationToMoment = moment(model.registrationTo);

        return currentMoment.isAfter(registrationFromMoment) && currentMoment.isBefore(registrationToMoment);
      }

      if (!!model.registrationFrom && !model.registrationTo) {
        const registrationFromMoment = moment(model.registrationFrom);

        return currentMoment.isAfter(registrationFromMoment);
      }

      if (!model.registrationFrom && !!model.registrationTo) {
        const registrationToMoment = moment(model.registrationTo);

        return currentMoment.isBefore(registrationToMoment);
      }

      return true;
    }
  }

  createEventRegistration$(eventRegistration: EventRegistrationModalPayload) {
    return this.summerEventService.registerForEvent$({
      eventId: eventRegistration.eventId,
      firstName: eventRegistration.firstname,
      lastName: eventRegistration.lastname
    });
  }

  downloadDetailsPdf(eventPdfUrl: string) {
    this.window.open(eventPdfUrl, "_blank");
  }
}
