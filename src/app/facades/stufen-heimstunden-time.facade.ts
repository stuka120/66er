import { Injectable } from "@angular/core";
import { forkJoin, Observable, throwError } from "rxjs";
import {
  selectBiberHeimstundenInfos,
  selectCaExHeimstundenInfos,
  selectGuSpHeimstundenInfos,
  selectRaRoHeimstundenInfos,
  selectStufenInfosNeedHeimstundenInfos,
  selectWiWoeHeimstundenInfos
} from "../root-store/stufen-info-store/selectors";
import {
  catchError,
  filter,
  map,
  share,
  startWith,
  switchMap,
  tap
} from "rxjs/operators";
import {
  loadAllHeimstundenAction,
  loadAllHeimstundenSuccessAction,
  loadAllStufenErrorAction
} from "../root-store/stufen-info-store/actions";
import { RootState } from "../root-store/root-state";
import { Store } from "@ngrx/store";
import { WordpressService } from "../services/wordpress.service";
import { HeimstundenTimeModel } from "../components/routing-views/stufen-overview/stufen-overview-dashboard.component";
import {
  StufenHeimstundenTimeState,
  StufenTimeCollection
} from "../root-store/stufen-info-store/state";
import { WordpressCategoryEnum } from "../dictionary/wordpress-category.enum";
import { WordpressTagEnum } from "../dictionary/wordpress-tag.enum";
import { muteFirst } from "../utils/rxjs/mute-first.util";

@Injectable()
export class StufenHeimstundenTimeFacade {
  constructor(
    private store$: Store<RootState>,
    private wordpressService: WordpressService
  ) {}

  private requireHeimstundenInfos$ = this.store$
    .select(selectStufenInfosNeedHeimstundenInfos)
    .pipe(
      filter(needHeimstundenInfos => needHeimstundenInfos),
      tap(() => this.store$.dispatch(loadAllHeimstundenAction())),
      switchMap(() => this.getStufenTimes$()),
      tap(heimstundenInfos =>
        this.store$.dispatch(
          loadAllHeimstundenSuccessAction({
            payload: {
              heimstundenInfos: heimstundenInfos
            }
          })
        )
      ),
      catchError(err => {
        this.store$.dispatch(loadAllStufenErrorAction(err));
        return throwError(err);
      }),
      share()
    );

  private getStufenTimes$(): Observable<StufenTimeCollection> {
    const getHeimstundenTime = (
      category: WordpressCategoryEnum
    ): Observable<StufenHeimstundenTimeState> => {
      return this.wordpressService
        .getPostByCategoryIdAndTagId$(category, WordpressTagEnum.Time)
        .pipe(
          map(
            post =>
              ({
                title: post.title.rendered,
                timeDescription: post.content.rendered
              } as StufenHeimstundenTimeState)
          )
        );
    };

    return forkJoin({
      biber: getHeimstundenTime(WordpressCategoryEnum.Biber),
      wiwoe: getHeimstundenTime(WordpressCategoryEnum.Wiwoe),
      gusp: getHeimstundenTime(WordpressCategoryEnum.Gusp),
      caex: getHeimstundenTime(WordpressCategoryEnum.Caex),
      raro: getHeimstundenTime(WordpressCategoryEnum.Raro)
    }).pipe(map(heimstundenTimes => <StufenTimeCollection>heimstundenTimes));
  }

  heimstundenBiber$ = muteFirst(
    this.requireHeimstundenInfos$.pipe(startWith(null)),
    this.store$.select(selectBiberHeimstundenInfos)
  );

  heimstundenWiWoe$: Observable<HeimstundenTimeModel> = muteFirst(
    this.requireHeimstundenInfos$.pipe(startWith(null)),
    this.store$.select(selectWiWoeHeimstundenInfos)
  );

  heimstundenGuSp$: Observable<HeimstundenTimeModel> = muteFirst(
    this.requireHeimstundenInfos$.pipe(startWith(null)),
    this.store$.select(selectGuSpHeimstundenInfos)
  );

  heimstundenCaEx$: Observable<HeimstundenTimeModel> = muteFirst(
    this.requireHeimstundenInfos$.pipe(startWith(null)),
    this.store$.select(selectCaExHeimstundenInfos)
  );

  heimstundenRaRo$: Observable<HeimstundenTimeModel> = muteFirst(
    this.requireHeimstundenInfos$.pipe(startWith(null)),
    this.store$.select(selectRaRoHeimstundenInfos)
  );
}
