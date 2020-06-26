import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EventResponseModel } from "../model/responses/event-response.model";

@Injectable()
export class EventService {
  constructor(private httpClient: HttpClient) {}

  public getEvents$(): Observable<EventResponseModel[]> {
    return this.httpClient.get<EventResponseModel[]>(`https://www.66er.net/wp-json/66extensions/v1/events`);
  }
}
