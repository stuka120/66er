import { Injectable } from "@angular/core";
import { forkJoin, Observable, throwError } from "rxjs";
import { StufenCardCollection, StufenCardModel } from "../model/stufen-card.model";
import {
  selectBiberStufenInfos,
  selectCaExStufenInfos,
  selectGuSpStufenInfos,
  selectRaRoStufenInfos,
  selectStufenInfosNeedStufenInfos,
  selectWiWoeStufenInfos
} from "../../root-store/stufen-info-store/selectors";
import { catchError, filter, map, share, startWith, switchMap, tap } from "rxjs/operators";
import {
  loadAllStufenAction,
  loadAllStufenErrorAction,
  loadAllStufenSuccessAction
} from "../../root-store/stufen-info-store/actions";
import { RootState } from "../../root-store/root-state";
import { Store } from "@ngrx/store";
import { WordpressService } from "../services/wordpress.service";
import { WordpressCategoryEnum } from "../dictionary/wordpress-category.enum";
import { WordpressTagEnum } from "../dictionary/wordpress-tag.enum";
import { muteFirst } from "../utils/rxjs/mute-first.util";
import { flatMultipleLineBreaks } from "../utils/html-string/flat-multiple-line-breaks.util";

@Injectable()
export class StufenDescriptionFacade {
  constructor(private store$: Store<RootState>, private wordpressService: WordpressService) {}

  private requireStufenInfos$: Observable<StufenCardCollection> = this.store$
    .select(selectStufenInfosNeedStufenInfos)
    .pipe(
      filter((needStufenInfos) => needStufenInfos),
      tap(() => this.store$.dispatch(loadAllStufenAction())),
      switchMap(() => this.getStufenInfos$()),
      tap((stufenInfos) =>
        this.store$.dispatch(
          loadAllStufenSuccessAction({
            payload: {
              ...stufenInfos
            }
          })
        )
      ),
      catchError((err) => {
        this.store$.dispatch(loadAllStufenErrorAction(err));
        return throwError(err);
      }),
      share()
    );

  private getStufenInfos$(): Observable<StufenCardCollection> {
    const getStufenCardModel = (
      category: WordpressCategoryEnum,
      link: string[],
      imageUrl: string
    ): Observable<StufenCardModel> => {
      return this.wordpressService.getWordpressPostByCategoryAndTag$(category, WordpressTagEnum.Content).pipe(
        map(
          (post) =>
            <StufenCardModel>{
              stufenUri: link,
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: flatMultipleLineBreaks(post.content.rendered),
              imgUrl: imageUrl
            }
        )
      );
    };

    return forkJoin({
      biber: getStufenCardModel(
        WordpressCategoryEnum.Biber,
        ["stufe", "biber"],
        "https://www.66er.net/wp-content/uploads/biber.jpg"
      ),
      wiwoe: getStufenCardModel(
        WordpressCategoryEnum.Wiwoe,
        ["stufe", "wiwoe"],
        "https://www.66er.net/wp-content/uploads/wiwoe.jpg"
      ),
      gusp: getStufenCardModel(
        WordpressCategoryEnum.Gusp,
        ["stufe", "gusp"],
        "https://www.66er.net/wp-content/uploads/gusp.png"
      ),
      caex: getStufenCardModel(
        WordpressCategoryEnum.Caex,
        ["stufe", "caex"],
        "https://www.66er.net/wp-content/uploads/caex.jpg"
      ),
      raro: getStufenCardModel(
        WordpressCategoryEnum.Raro,
        ["stufe", "raro"],
        "https://www.66er.net/wp-content/uploads/raro.png"
      )
    }).pipe(map((stufenCardCollection) => <StufenCardCollection>stufenCardCollection));
  }

  public stufenInfoBiber$ = muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectBiberStufenInfos)
  );

  public stufenInfoWiWoe$ = muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectWiWoeStufenInfos)
  );

  public stufenInfoGuSp$ = muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectGuSpStufenInfos)
  );

  public stufenInfoCaEx$ = muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectCaExStufenInfos)
  );

  public stufenInfoRaRo$ = muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectRaRoStufenInfos)
  );
}

export type ImageSize =
  | "thumbnail"
  | "medium"
  | "onepress-blog-small"
  | "onepress-small"
  | "full"
  | "large"
  | "original";
