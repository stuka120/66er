import { Observable } from "rxjs";
import { StufenCardModel } from "../../model/stufen-card.model";
import { TeamCardCollectionModel } from "../../components/team-card-collection/team-card-collection.model";
import { DownloadsCardModel } from "../../components/downloads-card/downloads-card.model";
import { HeimstundenTimeModel } from "../../components/stufen-overview-dashboard/stufen-overview-dashboard.component";
import { HeroBannerModel } from '../../components/hero-banner/hero-banner.model';

export interface StufenFacadeInterface {
  stufenName: string;

  stufenInfo$: Observable<StufenCardModel>;

  stufenHeimstunden$: Observable<HeimstundenTimeModel>;

  stufenTeam$: Observable<TeamCardCollectionModel>;

  stufenDownloads$: Observable<DownloadsCardModel>;

  stufenBannerModel$: Observable<HeroBannerModel>;
}
