import { Injectable } from "@angular/core";
import { StufenInfoFacade } from "../stufen-info.facade";
import { Observable } from "rxjs";
import { StufenCardModel } from "../../model/stufen-card.model";
import { DownloadsFacade } from "../downloads.facade";
import { TeamCardCollectionModel } from "../../components/team-card-collection/team-card-collection.model";
import { DownloadsCardModel } from "../../components/downloads-card/downloads-card.model";
import { map } from "rxjs/operators";
import { StufenFacadeInterface } from "./stufen-facade.interface";

@Injectable({
  providedIn: "root"
})
export class WiwoeDashboardFacade implements StufenFacadeInterface {
  constructor(
    private downloadFacade: DownloadsFacade,
    private stufenFacade: StufenInfoFacade
  ) {}

  stufenInfo$: Observable<StufenCardModel> = this.stufenFacade.stufenInfoWiWoe$;

  stufenTeam$: Observable<TeamCardCollectionModel> = this.stufenFacade
    .teamPostsWiWoe$;

  stufenDownloads$: Observable<
    DownloadsCardModel
  > = this.downloadFacade.getDownloadsByTagName("downloads_wiwoe").pipe(
    map(
      downloads =>
        ({
          title: "WiWö Downloads",
          downloads: downloads
        } as DownloadsCardModel)
    )
  );
}
