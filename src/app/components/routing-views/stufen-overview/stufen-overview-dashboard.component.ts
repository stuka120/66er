import { Component, Injector, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootState } from "../../../root-store/root-state";
import { Observable } from "rxjs";
import { HeroBannerModel } from "../../components/hero-banner/hero-banner.model";
import { StufenCardModel } from "../../../model/stufen-card.model";
import { TeamCardCollectionModel } from "../../components/team-card-collection/team-card-collection.model";
import { DownloadsCardModel } from "../../components/downloads-card/downloads-card.model";
import { StufenFacadeInterface } from "../../../facades/stufen-facades/stufen-facade.interface";
import { ActivatedRoute } from "@angular/router";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { MyWordpressFacade } from "../../../facades/my-wordpress.facade";
import { WordpressDictionary } from "../../../dictionary/wordpress.dictionary";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-stufen-overview-dashboard",
  templateUrl: "./stufen-overview-dashboard.component.html",
  styleUrls: ["./stufen-overview-dashboard.component.css"]
})
export class StufenOverviewDashboardComponent implements OnInit {
  stufenFacade: StufenFacadeInterface;

  heroBannerModel$: Observable<HeroBannerModel>;
  stufenInfo$: Observable<StufenCardModel>;
  teamMembers$: Observable<TeamCardCollectionModel>;
  downloads$: Observable<DownloadsCardModel>;
  heimstunden$: Observable<HeimstundenTimeModel>;

  faCog = faCog;

  constructor(
    private store$: Store<RootState>,
    private route: ActivatedRoute,
    private injector: Injector,
    private myWordpressFacade: MyWordpressFacade
  ) {}

  ngOnInit() {
    this.stufenFacade = this.injector.get(
      this.route.snapshot.data["requiredService"]
    );

    this.heroBannerModel$ = this.stufenFacade.stufenBannerModel$;
    this.stufenInfo$ = this.stufenFacade.stufenInfo$;
    this.heimstunden$ = this.stufenFacade.stufenHeimstunden$;
    this.teamMembers$ = this.stufenFacade.stufenTeam$;
    this.downloads$ = this.stufenFacade.stufenDownloads$;
  }
}

export interface HeimstundenTimeModel {
  title: string;
  timeDescription: string;
}
