import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../../model/post.model";
import { StufenCardModel } from "src/app/model/stufen-card.model";
import { Store } from "@ngrx/store";
import { selectPostsIsLoading } from "../../../root-store/posts-store/selectors";
import { RootState } from "../../../root-store/root-state";
import { selectStufenInfosIsLoading } from "../../../root-store/stufen-info-store/selectors";
import { HeroBannerModel } from "../../components/hero-banner/hero-banner.model";
import { StufenDescriptionFacade } from "../../../facades/stufen-description-facade.service";
import { MyFacebookFacade } from "../../../facades/my-facebook.facade";
import { UpcomingEventModel } from "../../components/upcoming-event-collection/upcoming-event.model";
import { EventsFacade } from "../../../facades/events.facade";
import { MyWordpressFacade } from "../../../facades/my-wordpress.facade";
import { ConfigFacade } from "../../../facades/config.facade";
import { WordpressCategoryEnum } from "../../../dictionary/wordpress-category.enum";
import { StufenTeaserFacade } from "../../../facades/stufen-teaser.facade";
import { Router } from "@angular/router";

@Component({
  selector: "app-start-dashboard",
  templateUrl: "./start-dashboard.component.html",
  styleUrls: ["./start-dashboard.component.css"]
})
export class StartDashboardComponent implements OnInit {
  posts$: Observable<Post[]>;

  stufenCardModels$: Observable<StufenCardModel[]>;
  isLoadingPosts$: Observable<boolean>;
  isLoadingStufenInfos$: Observable<boolean>;

  heroBannerModel$: Observable<HeroBannerModel>;
  heroBannerUrl$: Observable<string>;

  upcomingEvents$: Observable<UpcomingEventModel[]>;

  constructor(
    private myFacebookFacade: MyFacebookFacade,
    private store$: Store<RootState>,
    private stufenInfoFacade: StufenDescriptionFacade,
    private stufenTeaserFacade: StufenTeaserFacade,
    private eventsFacade: EventsFacade,
    private wordpressFacade: MyWordpressFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoadingPosts$ = this.store$.select(selectPostsIsLoading);
    this.isLoadingStufenInfos$ = this.store$.select(selectStufenInfosIsLoading);
    this.heroBannerUrl$ = this.wordpressFacade.getBannerUrlForCategory$(
      WordpressCategoryEnum.Startseite
    );
    this.heroBannerModel$ = this.wordpressFacade.getStartseiteBanner$();
    this.posts$ = this.myFacebookFacade.posts$;
    this.stufenCardModels$ = this.stufenTeaserFacade.stufenTeasersAll$;
    this.upcomingEvents$ = this.eventsFacade.getUpomingEventsForNextMonth();
  }

  heroButtonClicked() {
    this.router.navigate([""], {
      fragment: "nachrichten",
      preserveFragment: true
    });
  }
}
