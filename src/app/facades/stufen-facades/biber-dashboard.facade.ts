import { Injectable } from "@angular/core";
import { StufenInfoFacade } from "../stufen-info.facade";
import { Observable } from "rxjs";
import { StufenCardModel } from "../../model/stufen-card.model";
import { DownloadsFacade } from "../downloads.facade";
import { TeamCardCollectionModel } from "../../components/components/team-card-collection/team-card-collection.model";
import { DownloadsCardModel } from "../../components/components/downloads-card/downloads-card.model";
import { map, startWith } from 'rxjs/operators';
import { StufenFacadeInterface } from "./stufen-facade.interface";
import { HeimstundenTimeModel } from "../../components/routing-views/stufen-overview/stufen-overview-dashboard.component";
import { WordpressDictionary } from '../../dictionary/wordpress.dictionary';
import { HeroBannerModel } from '../../components/components/hero-banner/hero-banner.model';
import { MyWordpressFacade } from '../my-wordpress.facade';

@Injectable({
  providedIn: "root"
})
export class BiberDashboardFacade implements StufenFacadeInterface {
  constructor(
    private downloadFacade: DownloadsFacade,
    private stufenFacade: StufenInfoFacade,
    private myWordpressFacade: MyWordpressFacade
  ) {}

  stufenName: string = "Biber";

  stufenInfo$: Observable<StufenCardModel> = this.stufenFacade.stufenInfoBiber$;

  stufenHeimstunden$: Observable<HeimstundenTimeModel> = this.stufenFacade
    .heimstundenBiber$;

  stufenTeam$: Observable<TeamCardCollectionModel> = this.stufenFacade
    .teamPostsBiber$;

  stufenDownloads$: Observable<
    DownloadsCardModel
  > = this.downloadFacade.getDownloadsByTagName(WordpressDictionary.downloads.biber).pipe(
    map(
      downloads =>
        ({
          title: "Biber Downloads",
          downloads: downloads
        } as DownloadsCardModel)
    )
  );

  stufenBannerModel$: Observable<HeroBannerModel> = this.myWordpressFacade.getBannerUrlForCategory$(WordpressDictionary.categories.biber).pipe(
    map(imageUrl => ({
      imageUrl: imageUrl,
      buttonText: null,
      morphextPrefix: "Wir sind Biber",
      morpext: null
    })),
    startWith({
      imageUrl: undefined,
      buttonText: null,
      morphextPrefix: "Wir sind Biber",
      morpext: null
    })
  );
}
