import { Observable } from "rxjs";
import { StufenCardModel } from "../../../components/components/stufen-card/stufen-card.model";
import { TeamCardCollectionComponentModel } from "../../../components/components/team-card-collection/team-card-collection.component-model";
import { DownloadsCardComponentModel } from "../../../components/components/downloads-card/downloads-card.component-model";
import { HeimstundenTimeModel } from "../../../components/routing-views/stufen-overview/stufen-overview-dashboard.component";
import { HeroBannerComponentModel } from "../../../components/components/hero-banner/hero-banner.component-model";

export interface StufenFacadeInterface {
  stufenName: string;

  stufenInfo$: Observable<StufenCardModel>;

  stufenHeimstunden$: Observable<HeimstundenTimeModel>;

  stufenTeam$: Observable<TeamCardCollectionComponentModel>;

  stufenDownloads$: Observable<DownloadsCardComponentModel>;

  stufenBannerModel$: Observable<HeroBannerComponentModel>;
}
