import { Injectable } from "@angular/core";
import { StufenInfoFacade } from "../stufen-info.facade";
import { Observable } from "rxjs";
import { StufenCardModel } from "../../model/stufen-card.model";
import { DownloadsFacade } from "../downloads.facade";
import { TeamCardCollectionModel } from "../../components/team-card-collection/team-card-collection.model";
import { DownloadsCardModel } from "../../components/downloads-card/downloads-card.model";
import { map, startWith } from 'rxjs/operators';
import { StufenFacadeInterface } from "./stufen-facade.interface";
import { HeimstundenTimeModel } from "../../components/stufen-overview-dashboard/stufen-overview-dashboard.component";
import { WordpressDictionary } from '../../dictionary/wordpress.dictionary';
import { HeroBannerModel } from '../../components/hero-banner/hero-banner.model';
import { MyWordpressFacade } from '../my-wordpress.facade';

@Injectable({
  providedIn: "root"
})
export class RaroDashboardFacade implements StufenFacadeInterface {
  constructor(
    private downloadFacade: DownloadsFacade,
    private stufenFacade: StufenInfoFacade,
    private myWordpressFacade: MyWordpressFacade
  ) {}

  stufenName: string = "RaRo";

  stufenInfo$: Observable<StufenCardModel> = this.stufenFacade.stufenInfoRaRo$;

  stufenHeimstunden$: Observable<HeimstundenTimeModel> = this.stufenFacade
    .heimstundenRaRo$;

  stufenTeam$: Observable<TeamCardCollectionModel> = this.stufenFacade
    .teamPostsRaRo$;

  stufenDownloads$: Observable<
    DownloadsCardModel
  > = this.downloadFacade.getDownloadsByTagName(WordpressDictionary.downloads.raro).pipe(
    map(
      downloads =>
        ({
          title: "Raro Downloads",
          downloads: downloads
        } as DownloadsCardModel)
    )
  );

  stufenBannerModel$: Observable<HeroBannerModel> = this.myWordpressFacade.getBannerUrlForCategory$(WordpressDictionary.categories.raro).pipe(
    map(imageUrl => ({
      imageUrl: imageUrl,
      buttonText: null,
      morphextPrefix: "Wir sind RaRo",
      morpext: null
    })),
    startWith({
      imageUrl: undefined,
      buttonText: null,
      morphextPrefix: "Wir sind RaRo",
      morpext: null
    })
  );
}
