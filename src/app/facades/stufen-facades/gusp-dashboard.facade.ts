import { Injectable } from "@angular/core";
import { StufenInfoFacade } from "../stufen-info.facade";
import { Observable } from "rxjs";
import { StufenCardModel } from "../../model/stufen-card.model";
import { DownloadsFacade } from "../downloads.facade";
import { TeamCardCollectionModel } from "../../components/team-card-collection/team-card-collection.model";
import { DownloadsCardModel } from "../../components/downloads-card/downloads-card.model";
import { map } from "rxjs/operators";
import { StufenFacadeInterface } from "./stufen-facade.interface";
import { HeimstundenTimeModel } from "../../components/stufen-overview-dashboard/stufen-overview-dashboard.component";
import { WordpressDictionary } from '../../dictionary/wordpress.dictionary';

@Injectable({
  providedIn: "root"
})
export class GuspDashboardFacade implements StufenFacadeInterface {
  constructor(
    private downloadFacade: DownloadsFacade,
    private stufenFacade: StufenInfoFacade
  ) {}

  stufenName: string = "GuSp";

  stufenInfo$: Observable<StufenCardModel> = this.stufenFacade.stufenInfoGuSp$;

  stufenHeimstunden$: Observable<HeimstundenTimeModel> = this.stufenFacade
    .heimstundenGuSp$;

  stufenTeam$: Observable<TeamCardCollectionModel> = this.stufenFacade
    .teamPostsGuSp$;

  stufenDownloads$: Observable<
    DownloadsCardModel
  > = this.downloadFacade.getDownloadsByTagName(WordpressDictionary.downloads.gusp).pipe(
    map(
      downloads =>
        ({
          title: "GuSp Downloads",
          downloads: downloads
        } as DownloadsCardModel)
    )
  );
}
