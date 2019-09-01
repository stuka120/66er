import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../model/post.model";
import { WordpressService } from "src/app/services/wordpress.service";
import { StufenCardModel } from "src/app/model/stufen-card.model";
import { Store } from "@ngrx/store";
import { selectPostsIsLoading } from "../../root-store/posts-store/selectors";
import { RootState } from "../../root-store/root-state";
import { selectStufenInfosIsLoading } from "../../root-store/stufen-info-store/selectors";
import { HeroBannerModel } from "../hero-banner/hero-banner.model";
import { StufenInfoFacade } from "../../facades/stufen-info.facade";
import { MyFacebookFacade } from "../../facades/my-facebook.facade";
import { DownloadsCardModel } from "../downloads-card/downloads-card.model";
import { DownloadModel } from "../../model/wordpress-media-response.dto";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { UpcomingEventModel } from "../upcoming-events/upcoming-event.model";
import { EventsFacade } from "../../facades/events.facade";
import { map } from "rxjs/operators";
import RRule from "rrule";

@Component({
  selector: "app-start-dashboard",
  templateUrl: "./start-dashboard.component.html",
  styleUrls: ["./start-dashboard.component.css"]
})
export class StartDashboardComponent implements OnInit {
  posts$: Observable<Post[]>;
  requirePosts$: Observable<Post[]>;

  stufenCardModels$: Observable<StufenCardModel[]>;
  isLoadingPosts$: Observable<boolean>;
  isLoadingStufenInfos$: Observable<boolean>;

  heroBannerModel: HeroBannerModel = {
    imageUrl: "http://test3.66er.net/wp-content/uploads/2019/03/titelbild.jpg",
    buttonText: "Aktuelles",
    morphextPrefix: "Wir sind ",
    morpext: "Biber, WiWö, GuSp, CaEx, RaRo, die 66er!"
  };

  downloadsCardModel: DownloadsCardModel = {
    title: "Downloads",
    icon: faArrowCircleDown,
    downloads: [
      {
        title: "Test",
        source_url: "https://www.google.at"
      } as DownloadModel
    ]
  };

  upcomingEvents$: Observable<UpcomingEventModel[]>;

  constructor(
    private myFacebookFacade: MyFacebookFacade,
    private wordpressService: WordpressService,
    private store$: Store<RootState>,
    private stufenInfoFacade: StufenInfoFacade,
    private eventsFacade: EventsFacade
  ) {}

  ngOnInit(): void {
    this.isLoadingPosts$ = this.store$.select(selectPostsIsLoading);
    this.isLoadingStufenInfos$ = this.store$.select(selectStufenInfosIsLoading);

    this.posts$ = this.myFacebookFacade.posts$;
    this.stufenCardModels$ = this.stufenInfoFacade.stufenTeasersAll$;
    this.upcomingEvents$ = this.eventsFacade.googleCalendarEvents$.pipe(
      map(events => {
        let mappedEvents = events.map(item => {
          let event = {
            title: item.summary
          } as UpcomingEventModel;
          if (item.recurrence && item.recurrence[0]) {
            let startDateTime = new Date(item.start.dateTime);
            let rrule = RRule.fromString(item.recurrence[0]);

            let nextMonth = new Date();
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            return rrule.between(new Date(), nextMonth).map(
              e =>
                ({
                  title: item.summary,
                  dateTime: new Date(
                    e.getFullYear(),
                    e.getMonth(),
                    e.getDay(),
                    startDateTime.getHours(),
                    startDateTime.getMinutes(),
                    startDateTime.getSeconds()
                  )
                } as UpcomingEventModel)
            )[0];
          } else {
            event.dateTime = item.start.dateTime;
          }

          return event;
        });
        return mappedEvents.filter(e => !!e);
      })
    );
  }
}
