import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CalenderEventDtoModel } from "../model/calender-event.model";

@Injectable({
  providedIn: "root"
})
export class GoogleCalenderService {
  constructor(private httpClient: HttpClient) {}

  public getEvents$(): Observable<CalenderEventDtoModel> {
    return this.httpClient.get<CalenderEventDtoModel>(
      "https://www.googleapis.com/calendar/v3/calendars/pu12ae6vgt369s2034bb38l34o@group.calendar.google.com/events?key=AIzaSyAr6dDbBmPq0jjED62RLVbirS9_6nP9_Zw"
    );
  }
}
