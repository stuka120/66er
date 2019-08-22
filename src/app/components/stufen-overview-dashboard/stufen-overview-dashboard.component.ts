import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootState } from "../../root-store/root-state";
import { Observable } from "rxjs";
import { HeroBannerModel } from "../hero-banner/hero-banner.model";
import { StufenInfoFacade } from "../../facades/stufen-info.facade";
import { StufenCardModel } from "../../model/stufen-card.model";
import { TeamCardCollectionModel } from "../team-card-collection/team-card-collection.model";

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

  stufenInfoWiWoe$: Observable<StufenCardModel>;

  teamMembers$: Observable<TeamCardCollectionModel>;

  constructor(
    private store$: Store<RootState>,
    private stufenInfoFacade: StufenInfoFacade
  ) {}

  ngOnInit() {
    this.stufenInfoWiWoe$ = this.stufenInfoFacade.stufenInfoWiWoe$;
    this.teamMembers$ = this.stufenInfoFacade.teamPostsWiWoe$;
  }
}
