import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { selectPostsIsLoading } from "../../../root-store/posts-store/selectors";
import { RootState } from "../../../root-store/root-state";
import { selectStufenInfosIsLoading } from "../../../root-store/stufen-info-store/selectors";
import { HeroBannerComponentModel } from "../../components/hero-banner/hero-banner.component-model";
import { UpcomingEventCollectionComponentModel } from "../../components/upcoming-event-collection/upcoming-event-collection.component-model";
import { Router } from "@angular/router";
import { PostResponseModel } from "../../../shared/model/responses/post.model";
import { MyFacebookFacade } from "../../../shared/facades/my-facebook.facade";
import { StufenTeaserFacade } from "../../../shared/facades/stufen-teaser.facade";
import { CalendarFacade } from "../../../shared/facades/calendar-facade.service";
import { StufenCardModel } from "../../../shared/model/stufen-card.model";
import { StufenDescriptionFacade } from "../../../shared/facades/stufen-description-facade.service";
import { MyWordpressFacade } from "../../../shared/facades/my-wordpress.facade";
import { WordpressCategoryEnum } from "../../../shared/dictionary/wordpress-category.enum";

@Component({
  selector: "app-start-dashboard",
  templateUrl: "./start-dashboard.component.html",
  styleUrls: ["./start-dashboard.component.css"]
})
export class StartDashboardComponent implements OnInit {
  posts$: Observable<PostResponseModel[]>;

  stufenCardModels$: Observable<StufenCardModel[]>;
  isLoadingPosts$: Observable<boolean>;
  isLoadingStufenInfos$: Observable<boolean>;

  heroBannerModel$: Observable<HeroBannerComponentModel>;
  heroBannerUrl$: Observable<string>;

  upcomingEvents$: Observable<UpcomingEventCollectionComponentModel[]>;

  constructor(
    private myFacebookFacade: MyFacebookFacade,
    private store$: Store<RootState>,
    private stufenInfoFacade: StufenDescriptionFacade,
    private stufenTeaserFacade: StufenTeaserFacade,
    private calendarFacade: CalendarFacade,
    private wordpressFacade: MyWordpressFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoadingPosts$ = this.store$.select(selectPostsIsLoading);
    this.isLoadingStufenInfos$ = this.store$.select(selectStufenInfosIsLoading);
    this.heroBannerUrl$ = this.wordpressFacade.getBannerUrlForCategory$(WordpressCategoryEnum.Startseite);
    this.heroBannerModel$ = this.wordpressFacade.getStartseiteBanner$();
    this.posts$ = this.myFacebookFacade.posts$;
    this.stufenCardModels$ = this.stufenTeaserFacade.stufenTeasersAll$;
    this.upcomingEvents$ = this.calendarFacade.getUpomingEventsForNextMonth();
  }

  heroButtonClicked() {
    this.router.navigate([""], {
      fragment: "nachrichten",
      preserveFragment: true
    });
  }
}
