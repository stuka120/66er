import { Injectable } from "@angular/core";
import { combineLatest, Observable, throwError } from "rxjs";
import { StufenCardCollection } from "../model/stufen-card.model";
import {
  selectBiberHeimstundenInfos,
  selectBiberStufenInfos,
  selectCaExHeimstundenInfos,
  selectCaExStufenInfos,
  selectGuSpHeimstundenInfos,
  selectGuSpStufenInfos,
  selectRaRoHeimstundenInfos,
  selectRaRoStufenInfos,
  selectStufenInfosAll,
  selectStufenInfosNeedHeimstundenInfos,
  selectStufenInfosNeedStufenInfos,
  selectWiWoeHeimstundenInfos,
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
  loadAllHeimstundenAction,
  loadAllHeimstundenSuccessAction,
  loadAllStufenAction,
  loadAllStufenErrorAction,
  loadAllStufenSuccessAction
} from "../root-store/stufen-info-store/actions";
import { RootState } from "../root-store/root-state";
import { Store } from "@ngrx/store";
import { WordpressService } from "../services/wordpress.service";
import { TeamCardModel } from "../components/team-card/team-card.model";
import { TeamCardCollectionModel } from "../components/team-card-collection/team-card-collection.model";
import { WordpressDictionary } from "../dictionary/wordpress.dictionary";
import { HeimstundenTimeModel } from "../components/stufen-overview-dashboard/stufen-overview-dashboard.component";

@Injectable()
export class StufenInfoFacade {
  constructor(
    private store$: Store<RootState>,
    private wordpressService: WordpressService
  ) {}

  public muteFirst = <T, R>(first$: Observable<T>, second$: Observable<R>) =>
    combineLatest([first$, second$]).pipe(
      map(([, second]) => second),
      distinctUntilChanged()
    );

  private requireStufenInfos$: Observable<
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
    this.requireStufenInfos$.pipe(startWith(null)),
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
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectBiberStufenInfos)
  );

  public stufenInfoWiWoe$ = this.muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectWiWoeStufenInfos)
  );

  public stufenInfoGuSp$ = this.muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectGuSpStufenInfos)
  );

  public stufenInfoCaEx$ = this.muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectCaExStufenInfos)
  );

  public stufenInfoRaRo$ = this.muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectRaRoStufenInfos)
  );

  public teamPostsBiber$: Observable<
    TeamCardCollectionModel
  > = this.wordpressService
    .getPostsByCategoryId$(WordpressDictionary.categories.biber.team)
    .pipe(
      filter(posts => !!posts && posts.length > 0),
      map(
        posts =>
          ({
            headerText: "Das Biber Team",
            teamMembers: posts.map(
              post =>
                ({
                  name: post.title.rendered,
                  description: post.content.rendered,
                  imgUrl:
                    post._embedded["wp:featuredmedia"][0].media_details.sizes
                      .large.source_url
                } as TeamCardModel)
            )
          } as TeamCardCollectionModel)
      )
    );

  public teamPostsWiWoe$: Observable<
    TeamCardCollectionModel
  > = this.wordpressService
    .getPostsByCategoryId$(WordpressDictionary.categories.wiwoe.team)
    .pipe(
      map(
        posts =>
          ({
            headerText: "Das WiWö Team",
            teamMembers: posts.map(
              post =>
                ({
                  name: post.title.rendered,
                  description: post.content.rendered,
                  imgUrl:
                    post._embedded["wp:featuredmedia"][0].media_details.sizes
                      .large.source_url
                } as TeamCardModel)
            )
          } as TeamCardCollectionModel)
      )
    );

  public teamPostsGuSp$: Observable<
    TeamCardCollectionModel
  > = this.wordpressService
    .getPostsByCategoryId$(WordpressDictionary.categories.gusp.team)
    .pipe(
      map(
        posts =>
          ({
            headerText: "Das GuSp Team",
            teamMembers: posts.map(
              post =>
                ({
                  name: post.title.rendered,
                  description: post.content.rendered,
                  imgUrl:
                    post._embedded["wp:featuredmedia"][0].media_details.sizes
                      .large.source_url
                } as TeamCardModel)
            )
          } as TeamCardCollectionModel)
      )
    );

  public teamPostsCaEx$: Observable<
    TeamCardCollectionModel
  > = this.wordpressService
    .getPostsByCategoryId$(WordpressDictionary.categories.caex.team)
    .pipe(
      map(
        posts =>
          ({
            headerText: "Das CaEx Team",
            teamMembers: posts.map(
              post =>
                ({
                  name: post.title.rendered,
                  description: post.content.rendered,
                  imgUrl:
                    post._embedded["wp:featuredmedia"][0].media_details.sizes
                      .large.source_url
                } as TeamCardModel)
            )
          } as TeamCardCollectionModel)
      )
    );

  public teamPostsRaRo$: Observable<
    TeamCardCollectionModel
  > = this.wordpressService
    .getPostsByCategoryId$(WordpressDictionary.categories.raro.team)
    .pipe(
      map(
        posts =>
          ({
            headerText: "Das RaRo Team",
            teamMembers: posts.map(
              post =>
                ({
                  name: post.title.rendered,
                  description: post.content.rendered,
                  imgUrl:
                    post._embedded["wp:featuredmedia"][0].media_details.sizes
                      .large.source_url
                } as TeamCardModel)
            )
          } as TeamCardCollectionModel)
      )
    );

  private requireHeimstundenInfos$ = this.store$
    .select(selectStufenInfosNeedHeimstundenInfos)
    .pipe(
      filter(needHeimstundenInfos => needHeimstundenInfos),
      tap(() => this.store$.dispatch(loadAllHeimstundenAction())),
      switchMap(() => this.wordpressService.getHeimstundenInfos$()),
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

  public heimstundenBiber$ = this.muteFirst(
    this.requireHeimstundenInfos$.pipe(startWith(null)),
    this.store$.select(selectBiberHeimstundenInfos)
  );

  heimstundenWiWoe$: Observable<HeimstundenTimeModel> = this.muteFirst(
    this.requireHeimstundenInfos$.pipe(startWith(null)),
    this.store$.select(selectWiWoeHeimstundenInfos)
  );

  heimstundenGuSp$: Observable<HeimstundenTimeModel> = this.muteFirst(
    this.requireHeimstundenInfos$.pipe(startWith(null)),
    this.store$.select(selectGuSpHeimstundenInfos)
  );

  heimstundenCaEx$: Observable<HeimstundenTimeModel> = this.muteFirst(
    this.requireHeimstundenInfos$.pipe(startWith(null)),
    this.store$.select(selectCaExHeimstundenInfos)
  );

  heimstundenRaRo$: Observable<HeimstundenTimeModel> = this.muteFirst(
    this.requireHeimstundenInfos$.pipe(startWith(null)),
    this.store$.select(selectRaRoHeimstundenInfos)
  );
}
