import { Injectable } from "@angular/core";
import { GoogleCalenderService } from "../services/google-calender.service";
import { combineLatest, Observable, throwError } from "rxjs";
import { GoogleCalenderEventResponseModel } from "../model/google-calender-event-response.model";
import { Store } from "@ngrx/store";
import { RootState } from "../root-store/root-state";
import {
  selectCalendarEvents,
  selectCalendarNeedEvents
} from "../root-store/calendar-store/selectors";
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  share,
  startWith,
  switchMap,
  tap
} from "rxjs/operators";
import {
  loadEventsAction,
  loadEventsErrorAction,
  loadEventsSuccessAction
} from "../root-store/calendar-store/actions";
import { UpcomingEventModel } from "../components/components/upcoming-event-collection/upcoming-event.model";

@Injectable({
  providedIn: "root"
})
export class EventsFacade {
  constructor(
    private store$: Store<RootState>,
    private googleCalendarService: GoogleCalenderService
  ) {}

  private requireGoogleCalendarEvents$: Observable<
    GoogleCalenderEventResponseModel[]
  > = this.store$.select(selectCalendarNeedEvents).pipe(
    filter(needEvents => needEvents),
    tap(() => this.store$.dispatch(loadEventsAction())),
    switchMap(() => this.googleCalendarService.getEvents$()),
    tap(events =>
      this.store$.dispatch(
        loadEventsSuccessAction({ payload: { events: events } })
      )
    ),
    catchError(err => {
      this.store$.dispatch(loadEventsErrorAction({ payload: { error: err } }));
      return throwError(err);
    })
  );

  googleCalendarEvents$ = combineLatest([
    this.requireGoogleCalendarEvents$.pipe(startWith(null)),
    this.store$.select(selectCalendarEvents)
  ]).pipe(
    map(([, second]) => second),
    distinctUntilChanged(),
    share()
  );

  public getUpcomingEventsSortedUntil(
    maxDate: Date
  ): Observable<UpcomingEventModel[]> {
    return this.googleCalendarService.getEventsTill(maxDate).pipe(
      map(events =>
        events
          .map(
            event =>
              <UpcomingEventModel>{
                title: event.summary,
                dateTime: event.start.dateTime,
                endDateTime: event.end.dateTime,
                place: event.location
              }
          )
          .sort(
            (a, b) =>
              new Date(a.dateTime).valueOf() - new Date(b.dateTime).valueOf()
          )
      )
    );
  }

  public getUpomingEventsForNextMonth(): Observable<
    UpcomingEventModel[]
  > {
    function nextMonth(): Date {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      return nextMonth;
    }

    return this.getUpcomingEventsSortedUntil(nextMonth());
  }
}
