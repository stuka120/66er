import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SummerEventResponseModel } from "../../model/responses/summer-event/summer-event-response.model";
import { EventRegistrationRequestModel } from "./requests/event-registration.request-model";

@Injectable()
export class SummerEventService {
  constructor(private httpClient: HttpClient) {}

  public getEvents$(): Observable<SummerEventResponseModel[]> {
    return this.httpClient.get<SummerEventResponseModel[]>(`https://www.66er.net/wp-json/66extensions/v1/events`);
  }

  public getAllEvents$(): Observable<SummerEventResponseModel[]> {
    return this.httpClient.get<SummerEventResponseModel[]>(`https://www.66er.net/wp-json/66extensions/v1/events/all`);
  }

  public registerForEvent$(eventRegistration: EventRegistrationRequestModel) {
    return this.httpClient.post<void>("https://www.66er.net/wp-json/66extensions/v1/registrations", eventRegistration);
  }
}
