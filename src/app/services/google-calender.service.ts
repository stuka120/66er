import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CalenderEventDtoModel, CalenderEventModel} from "../model/calender-event.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class GoogleCalenderService {
  constructor(private httpClient: HttpClient) {}

  public getEvents$(): Observable<CalenderEventModel[]> {
    return this.httpClient
      .get<CalenderEventDtoModel>(
        // tslint:disable-next-line:max-line-length
        "https://www.googleapis.com/calendar/v3/calendars/pu12ae6vgt369s2034bb38l34o@group.calendar.google.com/events?key=AIzaSyAr6dDbBmPq0jjED62RLVbirS9_6nP9_Zw"
      )
      .pipe(map(dto => dto.items));
  }
}
