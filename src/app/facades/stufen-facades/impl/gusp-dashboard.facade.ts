import { Injectable } from "@angular/core";
import { StufenDescriptionFacade } from "../../stufen-description-facade.service";
import { Observable } from "rxjs";
import { StufenCardModel } from "../../../model/stufen-card.model";
import { DownloadsFacade } from "../../downloads.facade";
import { TeamCardCollectionModel } from "../../../components/components/team-card-collection/team-card-collection.model";
import { DownloadsCardModel } from "../../../components/components/downloads-card/downloads-card.model";
import { map, startWith } from "rxjs/operators";
import { StufenFacadeInterface } from "../stufen-facade.interface";
import { HeimstundenTimeModel } from "../../../components/routing-views/stufen-overview/stufen-overview-dashboard.component";
import { HeroBannerModel } from "../../../components/components/hero-banner/hero-banner.model";
import { MyWordpressFacade } from "../../my-wordpress.facade";
import { WordpressCategoryEnum } from "../../../dictionary/wordpress-category.enum";
import { WordpressDownloadEnum } from "../../../dictionary/wordpress-download.enum";
import { StufenTeamPostFacade } from "../../stufen-team-post.facade";
import { StufenHeimstundenTimeFacade } from "../../stufen-heimstunden-time.facade";

@Injectable({
  providedIn: "root"
})
export class GuspDashboardFacade implements StufenFacadeInterface {
  constructor(
    private downloadFacade: DownloadsFacade,
    private stufenInfoFacade: StufenDescriptionFacade,
    private stufenTeamPostFacade: StufenTeamPostFacade,
    private stufenHeimstundenTimeFacade: StufenHeimstundenTimeFacade,
    private myWordpressFacade: MyWordpressFacade
  ) {}

  stufenName: string = "GuSp";

  stufenInfo$: Observable<StufenCardModel> = this.stufenInfoFacade
    .stufenInfoGuSp$;

  stufenHeimstunden$: Observable<HeimstundenTimeModel> = this
    .stufenHeimstundenTimeFacade.heimstundenGuSp$;

  stufenTeam$: Observable<TeamCardCollectionModel> = this.stufenTeamPostFacade
    .teamPostsGuSp$;

  stufenDownloads$: Observable<
    DownloadsCardModel
  > = this.downloadFacade
    .getDownloadsByTagName(WordpressDownloadEnum.Gusp)
    .pipe(
      map(
        downloads =>
          ({
            title: "GuSp Downloads",
            downloads: downloads
          } as DownloadsCardModel)
      )
    );

  stufenBannerModel$: Observable<
    HeroBannerModel
  > = this.myWordpressFacade
    .getBannerUrlForCategory$(WordpressCategoryEnum.Gusp)
    .pipe(
      map(imageUrl => ({
        imageUrl: imageUrl,
        buttonText: null,
        morphextPrefix: "Wir sind GuSp",
        morpext: null
      })),
      startWith({
        imageUrl: undefined,
        buttonText: null,
        morphextPrefix: "Wir sind GuSp",
        morpext: null
      })
    );
}
