import { Observable } from "rxjs";
import { StufenCardModel } from "../../model/stufen-card.model";
import { TeamCardCollectionModel } from "../../components/team-card-collection/team-card-collection.model";
import { DownloadsCardModel } from "../../components/downloads-card/downloads-card.model";

export interface StufenFacadeInterface {
  stufenInfo$: Observable<StufenCardModel>;

  stufenTeam$: Observable<TeamCardCollectionModel>;

  stufenDownloads$: Observable<DownloadsCardModel>;
}
