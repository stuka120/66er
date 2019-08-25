import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GoogleCalenderService } from "../../services/google-calender.service";
import {
  distinctUntilChanged,
  filter,
  map,
  share,
  startWith,
  switchMap,
  tap
} from "rxjs/operators";
import RRule from "rrule";
import { Store } from "@ngrx/store";
import {
  selectCalendarEvents,
  selectCalendarNeedEvents
} from "../../root-store/calendar-store/selectors";
import {
  loadEventsAction,
  loadEventsSuccessAction
} from "../../root-store/calendar-store/actions";
import { RootState } from "../../root-store/root-state";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import {
  ButtonTextCompoundInput,
  ToolbarInput
} from "@fullcalendar/core/types/input-types";
import { FormatterInput } from "@fullcalendar/core/datelib/formatting";

@Component({
  selector: "mwl-demo-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["calendar-dashboard.component.css"],
  templateUrl: "calendar-dashboard.component.html"
})
export class CalendarDashboardComponent implements OnInit {
  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;

  calendarPlugins = [dayGridPlugin, bootstrapPlugin]; // important!
  header: ToolbarInput = {
    left: "prev,next",
    center: "title",
    right: "today"
  };
  buttonText: ButtonTextCompoundInput = {
    day: "Tag",
    month: "Monat",
    next: "Weiter",
    nextYear: "Nächstes Jahr",
    prev: "Zurück",
    prevYear: "Vorriges Jahr",
    today: "Heute",
    week: "Woche"
  };
  eventTimeFormat: FormatterInput = {
    hour: "2-digit",
    minute: "2-digit",
    meridiem: false,
    hour12: false
  };

  needEvents$: Observable<any>;
  events$: Observable<EventInput[]>;

  constructor(
    private modal: NgbModal,
    private googleCalenderService: GoogleCalenderService,
    private store$: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.needEvents$ = this.store$.select(selectCalendarNeedEvents).pipe(
      filter(needEvents => needEvents),
      tap(() => this.store$.dispatch(loadEventsAction())),
      switchMap(() => this.googleCalenderService.getEvents$()),
      tap(items =>
        this.store$.dispatch(
          loadEventsSuccessAction({ payload: { events: items } })
        )
      ),
      share()
    );

    this.events$ = this.muteFirst(
      this.needEvents$.pipe(startWith(null)),
      this.store$.select(selectCalendarEvents).pipe(
        map(items => {
          let result = [] as EventInput[];
          items.forEach(item => {
            if (item.recurrence) {
              item.recurrence.forEach(rec => {
                const rule = RRule.fromString(rec);
                rule.options.dtstart = new Date(item.start.dateTime);

                result = result.concat(rule
                  .between(
                    new Date(Date.UTC(2019, 6, 1)),
                    new Date(Date.UTC(2019, 8, 31))
                  )
                  .map(date => {
                    date.setHours(new Date(item.start.dateTime).getHours());
                    date.setMinutes(new Date(item.start.dateTime).getMinutes());
                    date.setSeconds(new Date(item.start.dateTime).getSeconds());
                    return {
                      title: item.summary,
                      start: date.toISOString()
                    } as EventInput;
                  }) as EventInput[]);
              });
            } else {
              result.push({
                title: item.summary,
                start: item.start.dateTime,
                end: item.end.dateTime,
                draggable: false,
                resizable: false,
                allDay: false
              } as EventInput);
            }
          });
          return result;
        })
      )
    );
  }

  public muteFirst = <T, R>(first$: Observable<T>, second$: Observable<R>) =>
    combineLatest([first$, second$]).pipe(
      map(([, second]) => second),
      distinctUntilChanged()
    );
}
