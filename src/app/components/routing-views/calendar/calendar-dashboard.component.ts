import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from "@angular/core";
import { Observable } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GoogleCalenderService } from "../../../services/google-calender.service";
import { filter, map, share, switchMap, tap } from "rxjs/operators";
import RRule from "rrule";
import { Store } from "@ngrx/store";
import { selectCalendarNeedEvents } from "../../../root-store/calendar-store/selectors";
import {
  loadEventsAction,
  loadEventsSuccessAction
} from "../../../root-store/calendar-store/actions";
import { RootState } from "../../../root-store/root-state";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import rrulePlugin from "@fullcalendar/rrule";
import momentPlugin from "@fullcalendar/moment";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import {
  ButtonTextCompoundInput,
  ToolbarInput
} from "@fullcalendar/core/types/input-types";
import { FormatterInput } from "@fullcalendar/core/datelib/formatting";
import { EventsFacade } from "../../../facades/events.facade";
import { EventClickedModalComponent } from "../../components/modal/event-clicked-modal/event-clicked-modal.component";

@Component({
  selector: "mwl-demo-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["calendar-dashboard.component.css"],
  templateUrl: "calendar-dashboard.component.html"
})
export class CalendarDashboardComponent implements OnInit {
  @ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;

  calendarPlugins = [
    dayGridPlugin,
    bootstrapPlugin,
    rrulePlugin,
    momentPlugin,
    momentTimezonePlugin
  ]; // important!
  header: ToolbarInput = {
    left: "prev,next",
    center: "title",
    right: "today"
  };
  buttonText: ButtonTextCompoundInput = {
    day: "Tag",
    month: "Monat",
    next: ">",
    nextYear: "Nächstes Jahr",
    prev: "<",
    prevYear: "Vorriges Jahr",
    today: "Heute",
    week: "Woche"
  };
  dayNames: [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
  ];
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
    private store$: Store<RootState>,
    private eventsFacade: EventsFacade
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

    this.events$ = this.eventsFacade.googleCalendarEvents$.pipe(
      map(items =>
        items.map(item => {
          let event = {
            title: item.summary
          } as EventInput;
          if (item.recurrence && item.recurrence[0]) {
            let rrule = RRule.fromString(item.recurrence[0]);
            if (!rrule.origOptions.dtstart) {
              let startDateTime = new Date(item.start.dateTime);
              rrule.origOptions.dtstart = new Date(
                new Date(
                  startDateTime.getFullYear(),
                  startDateTime.getMonth(),
                  startDateTime.getDay(),
                  startDateTime.getHours() + 1, //Hotfix for hour problem
                  startDateTime.getMinutes()
                )
              );
            }
            event.rrule = rrule.origOptions;
          } else {
            event.start = item.start.dateTime;
            event.end = item.end.dateTime;
          }

          return event;
        })
      )
    );
  }

  eventClicked($event: any) {
    let openedModal = this.modal.open(EventClickedModalComponent, {
      centered: true
    });
    let componentInstance = openedModal.componentInstance as EventClickedModalComponent;
    componentInstance.model = {
      title: $event.event.title,
      scheduledDateTime: $event.event.start,
      location: ""
    };
  }
}
