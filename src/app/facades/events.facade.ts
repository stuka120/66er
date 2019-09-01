import { Injectable } from "@angular/core";
import { GoogleCalenderService } from "../services/google-calender.service";
import { combineLatest, Observable, throwError } from "rxjs";
import { CalenderEventModel } from "../model/calender-event.model";
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

@Injectable({
  providedIn: "root"
})
export class EventsFacade {
  constructor(
    private store$: Store<RootState>,
    private googleCalendarService: GoogleCalenderService
  ) {}

  private requireGoogleCalendarEvents$: Observable<
    CalenderEventModel[]
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

  public getGoogleCalenderEventsUntil(
    maxDate: Date
  ): Observable<CalenderEventModel[]> {
    return this.googleCalendarService.getEventsTill(maxDate);
  }
}
