import { Injectable } from "@angular/core";
import { combineLatest, Observable, throwError } from "rxjs";
import {
  StufenCardCollection,
  StufenCardModel
} from "../model/stufen-card.model";
import {
  selectBiberStufenInfos,
  selectCaExStufenInfos,
  selectGuSpStufenInfos,
  selectRaRoStufenInfos,
  selectStufenInfosAll,
  selectStufenInfosNeedStufenInfos,
  selectWiWoeStufenInfos
} from "../root-store/stufen-info-store/selectors";
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  share,
  startWith,
  switchMap,
  tap
} from "rxjs/operators";
import {
  loadAllStufenAction,
  loadAllStufenErrorAction,
  loadAllStufenSuccessAction
} from "../root-store/stufen-info-store/actions";
import { RootState } from "../root-store/root-state";
import { Store } from "@ngrx/store";
import { WordpressService } from "../services/wordpress.service";

@Injectable()
export class StufenInfoFacade {
  constructor(
    private store$: Store<RootState>,
    private wordpressService: WordpressService
  ) {}

  public muteFirst = <T, R>(first$: Observable<T>, second$: Observable<R>) =>
    combineLatest([first$, second$]).pipe(
      map(([first, second]) => second),
      distinctUntilChanged()
    );

  private requireStufenCardModels$: Observable<
    StufenCardCollection
  > = this.store$.select(selectStufenInfosNeedStufenInfos).pipe(
    filter(needStufenInfos => needStufenInfos),
    tap(() => this.store$.dispatch(loadAllStufenAction())),
    switchMap(() => this.wordpressService.getStufenInfos$()),
    tap(stufenInfos =>
      this.store$.dispatch(
        loadAllStufenSuccessAction({
          payload: {
            ...stufenInfos
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

  public stufenInfosAll$ = this.muteFirst(
    this.requireStufenCardModels$.pipe(startWith(null)),
    this.store$
      .select(selectStufenInfosAll)
      .pipe(
        map(stufenInfos => [
          stufenInfos.biber,
          stufenInfos.wiwoe,
          stufenInfos.gusp,
          stufenInfos.caex,
          stufenInfos.raro
        ])
      )
  );

  public stufenInfoBiber$ = this.muteFirst(
    this.requireStufenCardModels$.pipe(startWith(null)),
    this.store$.select(selectBiberStufenInfos)
  );

  public stufenInfoWiWoe$ = this.muteFirst(
    this.requireStufenCardModels$.pipe(startWith(null)),
    this.store$.select(selectWiWoeStufenInfos)
  );

  public stufenInfoGuSp$ = this.muteFirst(
    this.requireStufenCardModels$.pipe(startWith(null)),
    this.store$.select(selectGuSpStufenInfos)
  );

  public stufenInfoCaEx$ = this.muteFirst(
    this.requireStufenCardModels$.pipe(startWith(null)),
    this.store$.select(selectCaExStufenInfos)
  );

  public stufenInfoRaRo$ = this.muteFirst(
    this.requireStufenCardModels$.pipe(startWith(null)),
    this.store$.select(selectRaRoStufenInfos)
  );
}
