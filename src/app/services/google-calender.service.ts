import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  CalenderEventDtoModel,
  CalenderEventModel
} from "../model/calender-event.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GoogleCalenderService {
  constructor(private httpClient: HttpClient) {}

  public getEvents$(): Observable<CalenderEventModel[]> {
    return this.httpClient
      .get<CalenderEventDtoModel>(
        // tslint:disable-next-line:max-line-length
        "https://www.66er.net/wp-json/calendar/v1/allEvents"
      )
      .pipe(map(dto => dto.items));
  }

  public getEventsTill(maxDate: Date): Observable<CalenderEventModel[]> {
    return this.httpClient
      .get<CalenderEventDtoModel>(
        // tslint:disable-next-line:max-line-length
        `https://www.66er.net/wp-json/calendar/v1/events?from=${new Date().toISOString()}&to=${maxDate.toISOString()}`
      )
      .pipe(map(dto => dto.items));
  }
}
