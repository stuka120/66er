import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { RootState } from "../../root-store/root-state";
import { WordpressService } from "../services/wordpress/wordpress.service";
import { forkJoin, Observable, throwError } from "rxjs";
import { catchError, filter, map, share, startWith, switchMap, tap } from "rxjs/operators";
import { StufenCardModel } from "../../components/components/stufen-card/stufen-card.model";
import {
  selectBiberTeaser,
  selectCaExTeaser,
  selectGuSpTeaser,
  selectRaRoTeaser,
  selectStufenInfosNeedTeaser,
  selectTeasersAll,
  selectWiWoeTeaser
} from "../../root-store/stufen-info-store/selectors";
import {
  loadAllStufenTeasersAction,
  loadAllStufenTeasersErrorAction,
  loadAllStufenTeasersSuccessAction
} from "../../root-store/stufen-info-store/actions";
import { WordpressCategoryEnum } from "../dictionary/wordpress-category.enum";
import { WordpressTagEnum } from "../dictionary/wordpress-tag.enum";
import { muteFirst } from "../utils/rxjs/mute-first.util";
import { removeHtmlTags } from "../utils/html-string/remove-html-tags.util";
import { StufenCardCollectionModel } from "../../components/components/stufen-card-collection/stufen-card-collection.model";

@Injectable()
export class StufenTeaserFacade {
  constructor(private store$: Store<RootState>, private wordpressService: WordpressService) {}

  private requireStufenTeasers$: Observable<StufenCardCollectionModel> = this.store$
    .select(selectStufenInfosNeedTeaser)
    .pipe(
      filter((needTeasers) => needTeasers),
      tap(() => this.store$.dispatch(loadAllStufenTeasersAction())),
      switchMap(() => this.getStufenTeasers$()),
      tap((stufenTeasers) =>
        this.store$.dispatch(
          loadAllStufenTeasersSuccessAction({
            payload: {
              ...stufenTeasers
            }
          })
        )
      ),
      catchError((err) => {
        this.store$.dispatch(loadAllStufenTeasersErrorAction(err));
        return throwError(err);
      }),
      share()
    );

  private getStufenTeasers$() {
    const getStufenCardModel = (category: WordpressCategoryEnum, link: string[]): Observable<StufenCardModel> => {
      return this.wordpressService.getWordpressPostByCategoryAndTag$(category, WordpressTagEnum.Teaser).pipe(
        map(
          (post) =>
            <StufenCardModel>{
              stufenUri: link,
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: removeHtmlTags(post.content.rendered),
              imgUrl: post._embedded["wp:featuredmedia"][0].source_url
            }
        )
      );
    };

    return forkJoin({
      biber: getStufenCardModel(WordpressCategoryEnum.Biber, ["stufe", "biber"]),
      wiwoe: getStufenCardModel(WordpressCategoryEnum.Wiwoe, ["stufe", "wiwoe"]),
      gusp: getStufenCardModel(WordpressCategoryEnum.Gusp, ["stufe", "gusp"]),
      caex: getStufenCardModel(WordpressCategoryEnum.Caex, ["stufe", "caex"]),
      raro: getStufenCardModel(WordpressCategoryEnum.Raro, ["stufe", "raro"])
    }).pipe(map((stufenCardCollection) => <StufenCardCollectionModel>stufenCardCollection));
  }

  public stufenTeasersAll$ = muteFirst(
    this.requireStufenTeasers$.pipe(startWith(null)),
    this.store$
      .select(selectTeasersAll)
      .pipe(
        map((stufenTeasers) => [
          stufenTeasers.biber,
          stufenTeasers.wiwoe,
          stufenTeasers.gusp,
          stufenTeasers.caex,
          stufenTeasers.raro
        ])
      )
  );

  public stufenTeaserBiber$ = muteFirst(
    this.requireStufenTeasers$.pipe(startWith(null)),
    this.store$.select(selectBiberTeaser)
  );

  public stufenTeaserWiWoe$ = muteFirst(
    this.requireStufenTeasers$.pipe(startWith(null)),
    this.store$.select(selectWiWoeTeaser)
  );

  public stufenTeaserGuSp$ = muteFirst(
    this.requireStufenTeasers$.pipe(startWith(null)),
    this.store$.select(selectGuSpTeaser)
  );

  public stufenTeaserCaEx$ = muteFirst(
    this.requireStufenTeasers$.pipe(startWith(null)),
    this.store$.select(selectCaExTeaser)
  );

  public stufenTeaserRaRo$ = muteFirst(
    this.requireStufenTeasers$.pipe(startWith(null)),
    this.store$.select(selectRaRoTeaser)
  );
}
