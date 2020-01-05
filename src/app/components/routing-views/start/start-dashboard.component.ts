import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../../model/post.model";
import { WordpressService } from "src/app/services/wordpress.service";
import { StufenCardModel } from "src/app/model/stufen-card.model";
import { Store } from "@ngrx/store";
import { selectPostsIsLoading } from "../../../root-store/posts-store/selectors";
import { RootState } from "../../../root-store/root-state";
import { selectStufenInfosIsLoading } from "../../../root-store/stufen-info-store/selectors";
import { HeroBannerModel } from "../../components/hero-banner/hero-banner.model";
import { StufenInfoFacade } from "../../../facades/stufen-info.facade";
import { MyFacebookFacade } from "../../../facades/my-facebook.facade";
import { DownloadsCardModel } from "../../components/downloads-card/downloads-card.model";
import { DownloadModel } from "../../../model/wordpress-media-response.dto";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { UpcomingEventModel } from "../../components/upcoming-event-collection/upcoming-event.model";
import { EventsFacade } from "../../../facades/events.facade";
import { map } from "rxjs/operators";
import { WordpressDictionary } from "../../../dictionary/wordpress.dictionary";
import { MyWordpressFacade } from "../../../facades/my-wordpress.facade";

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

  heroBannerModel$: Observable<HeroBannerModel>;
  heroBannerUrl$: Observable<string>;

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
    private eventsFacade: EventsFacade,
    private wordpressFacade: MyWordpressFacade
  ) {}

  ngOnInit(): void {
    this.isLoadingPosts$ = this.store$.select(selectPostsIsLoading);
    this.isLoadingStufenInfos$ = this.store$.select(selectStufenInfosIsLoading);
    this.heroBannerUrl$ = this.wordpressService
      .getPostByCategoryIdAndTagId$(
        WordpressDictionary.categories.startseite,
        WordpressDictionary.tags.bannerImage
      )
      .pipe(map(post => post._embedded["wp:featuredmedia"][0].source_url));

    this.heroBannerModel$ = this.wordpressFacade.getStartseiteBanner$();

    this.posts$ = this.myFacebookFacade.posts$;
    this.stufenCardModels$ = this.stufenInfoFacade.stufenTeasersAll$;

    let nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    this.upcomingEvents$ = this.eventsFacade
      .getGoogleCalenderEventsUntil(nextMonth)
      .pipe(
        map(events =>
          events.map(
            event =>
              ( <UpcomingEventModel> {
                title: event.summary,
                dateTime: event.start.dateTime,
                endDateTime: event.end.dateTime,
                place: event.location
              })
          ).sort((a, b) => new Date(a.dateTime).valueOf() - new Date(b.dateTime).valueOf())
        )
      );
  }
}
