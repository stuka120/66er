import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from "@angular/core";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from "date-fns";
import {combineLatest, Observable, Subject} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView
} from "angular-calendar";
import {GoogleCalenderService} from "../../services/google-calender.service";
import {distinctUntilChanged, filter, first, flatMap, map, share, startWith, switchMap, tap} from "rxjs/operators";
import RRule from "rrule";
import {Store} from "@ngrx/store";
import {selectCalendarEvents, selectCalendarNeedEvents} from "../../root-store/calendar-store/selectors";
import {loadEventsAction, loadEventsSuccessAction} from "../../root-store/calendar-store/actions";
import {CalenderEventDtoModel, CalenderEventModel} from "../../model/calender-event.model";
import {RootState} from "../../root-store/root-state";

const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3"
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF"
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA"
  }
};

@Component({
  selector: "mwl-demo-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["calendar-dashboard.component.css"],
  templateUrl: "calendar-dashboard.component.html"
})
export class CalendarDashboardComponent implements OnInit {
  @ViewChild("modalContent", {static: true}) modalContent: TemplateRef<any>;

  needEvents$: Observable<any>;
  events$: Observable<CalendarEvent[]>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;

  constructor(
    private modal: NgbModal,
    private googleCalenderService: GoogleCalenderService,
    private store$: Store<RootState>
  ) {
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: "lg"});
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
    this.needEvents$ = this.store$.select(selectCalendarNeedEvents).pipe(
      filter(needEvents => needEvents),
      tap(() => this.store$.dispatch(loadEventsAction())),
      switchMap(() => this.googleCalenderService.getEvents$()),
      tap(items => this.store$.dispatch(loadEventsSuccessAction({payload: {events: items}}))),
      share()
    );

    this.events$ = this.muteFirst(
      this.needEvents$.pipe(startWith(null)),
      this.store$.select(selectCalendarEvents).pipe(
        map(items => {
            let result = [] as CalendarEvent[];
            items.forEach(item => {
              if (item.recurrence) {
                item.recurrence.forEach(rec => {
                  const rule = RRule.fromString(rec);
                  rule.options.dtstart = new Date(item.start.dateTime);

                  result = result.concat((
                    rule
                      .between(
                        new Date(Date.UTC(2019, 6, 1)),
                        new Date(Date.UTC(2019, 6, 31))
                      )
                      .map(date => {
                        return {
                          title: item.summary,
                          start: date
                        } as CalendarEvent;
                      })
                  ) as CalendarEvent[]);
                });
              } else {
                result.push({
                  start: new Date(item.start.dateTime),
                  end: new Date(item.end.dateTime),
                  draggable: false,
                  actions: this.actions,
                  resizable: false,
                  allDay: false,
                  title: item.summary
                } as CalendarEvent);
              }
            });
            return result;
          }
        )
      )
    );
  }

  public muteFirst = <T, R>(first$: Observable<T>, second$: Observable<R>) => combineLatest([first$, second$]).pipe(
    map(([first, second]) => second),
    distinctUntilChanged()
  )
}
