import { Component, Injector, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootState } from "../../root-store/root-state";
import { Observable } from "rxjs";
import { HeroBannerModel } from "../hero-banner/hero-banner.model";
import { StufenCardModel } from "../../model/stufen-card.model";
import { TeamCardCollectionModel } from "../team-card-collection/team-card-collection.model";
import { DownloadsCardModel } from "../downloads-card/downloads-card.model";
import { StufenFacadeInterface } from "../../facades/stufen-facades/stufen-facade.interface";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-stufen-overview-dashboard",
  templateUrl: "./stufen-overview-dashboard.component.html",
  styleUrls: ["./stufen-overview-dashboard.component.css"]
})
export class StufenOverviewDashboardComponent implements OnInit {
  heroBannerModel: HeroBannerModel = {
    imageUrl: "http://test3.66er.net/wp-content/uploads/2019/03/titelbild.jpg",
    buttonText: null,
    morpext: null,
    morphextPrefix: "Wir sind die WiWö",
    imageHeight: 20
  };

  stufenFacade: StufenFacadeInterface;

  stufenInfoWiWoe$: Observable<StufenCardModel>;
  teamMembers$: Observable<TeamCardCollectionModel>;
  downloads$: Observable<DownloadsCardModel>;

  constructor(
    private store$: Store<RootState>,
    private route: ActivatedRoute,
    private injector: Injector
  ) {}

  ngOnInit() {
    this.stufenFacade = this.injector.get(
      this.route.snapshot.data["requiredService"]
    );

    this.stufenInfoWiWoe$ = this.stufenFacade.stufenInfo$;
    this.teamMembers$ = this.stufenFacade.stufenTeam$;
    this.downloads$ = this.stufenFacade.stufenDownloads$;
  }
}
