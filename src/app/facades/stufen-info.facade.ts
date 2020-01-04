import { Injectable } from "@angular/core";
import { combineLatest, Observable, throwError } from "rxjs";
import {
  StufenCardCollection,
  StufenCardModel
} from "../model/stufen-card.model";
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
  selectWiWoeStufenInfos,
  selectStufenInfosNeedTeaser,
  selectTeasersAll,
  selectBiberTeaser,
  selectWiWoeTeaser,
  selectGuSpTeaser,
  selectCaExTeaser,
  selectRaRoTeaser
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
  loadAllStufenSuccessAction,
  loadAllStufenTeasersAction,
  loadAllStufenTeasersSuccessAction,
  loadAllStufenTeasersErrorAction
} from "../root-store/stufen-info-store/actions";
import { RootState } from "../root-store/root-state";
import { Store } from "@ngrx/store";
import { WordpressService } from "../services/wordpress.service";
import { TeamCardModel } from "../components/components/team-card/team-card.model";
import { TeamCardCollectionModel } from "../components/components/team-card-collection/team-card-collection.model";
import { WordpressDictionary } from "../dictionary/wordpress.dictionary";
import { HeimstundenTimeModel } from "../components/routing-views/stufen-overview/stufen-overview-dashboard.component";
import {
  StufenHeimstundenCollection,
  StufenHeimstundenInfoState
} from "../root-store/stufen-info-store/state";
import { RemoveHtmlPipe } from "../pipes/remove-html.pipe";
import { RemoveMultipleBreaksPipe } from "../pipes/remove-multiple-breaks.pipe";

@Injectable()
export class StufenInfoFacade {
  constructor(
    private store$: Store<RootState>,
    private wordpressService: WordpressService,
    private removeHtmlPipe: RemoveHtmlPipe,
    private removeMultipleBreaks: RemoveMultipleBreaksPipe
  ) {}

  public muteFirst = <T, R>(first$: Observable<T>, second$: Observable<R>) =>
    combineLatest([first$, second$]).pipe(
      map(([, second]) => second),
      distinctUntilChanged()
    );

  ////////////////////////////////////
  ///////// Stufen Infos /////////////
  ////////////////////////////////////

  private requireStufenInfos$: Observable<
    StufenCardCollection
  > = this.store$.select(selectStufenInfosNeedStufenInfos).pipe(
    filter(needStufenInfos => needStufenInfos),
    tap(() => this.store$.dispatch(loadAllStufenAction())),
    switchMap(() => this.getStufenInfos$()),
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

  private getStufenInfos$() {
    return combineLatest([
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.biber,
          WordpressDictionary.tags.content
        )
        .pipe(
          map(
            post =>
              <StufenCardModel>{
                stufenUri: ["stufe", "biber"],
                title: post.title.rendered,
                shortDescription: post.excerpt.rendered,
                fullDescription: this.removeMultipleBreaks.transform(
                  post.content.rendered
                ),
                imgUrl: "https://www.66er.net/wp-content/uploads/biber.jpg"
              }
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.wiwoe,
          WordpressDictionary.tags.content
        )
        .pipe(
          map(
            post =>
              <StufenCardModel>{
                stufenUri: ["stufe", "wiwoe"],
                title: post.title.rendered,
                shortDescription: post.excerpt.rendered,
                fullDescription: this.removeMultipleBreaks.transform(
                  post.content.rendered
                ),
                imgUrl: "https://www.66er.net/wp-content/uploads/wiwoe.jpg"
              }
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.gusp,
          WordpressDictionary.tags.content
        )
        .pipe(
          map(
            post =>
              <StufenCardModel>{
                stufenUri: ["stufe", "gusp"],
                title: post.title.rendered,
                shortDescription: post.excerpt.rendered,
                fullDescription: this.removeMultipleBreaks.transform(
                  post.content.rendered
                ),
                imgUrl: "https://www.66er.net/wp-content/uploads/gusp.png"
              }
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.caex,
          WordpressDictionary.tags.content
        )
        .pipe(
          map(
            post =>
              <StufenCardModel>{
                stufenUri: ["stufe", "caex"],
                title: post.title.rendered,
                shortDescription: post.excerpt.rendered,
                fullDescription: this.removeMultipleBreaks.transform(
                  post.content.rendered
                ),
                imgUrl: "https://www.66er.net/wp-content/uploads/caex.jpg"
              }
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.raro,
          WordpressDictionary.tags.content
        )
        .pipe(
          map(
            post =>
              <StufenCardModel>{
                stufenUri: ["stufe", "raro"],
                title: post.title.rendered,
                shortDescription: post.excerpt.rendered,
                fullDescription: this.removeMultipleBreaks.transform(
                  post.content.rendered
                ),
                imgUrl: "https://www.66er.net/wp-content/uploads/raro.png"
              }
          )
        )
    ]).pipe(
      map(
        ([biber, wiwoe, gusp, caex, raro]) =>
          ({
            biber,
            wiwoe,
            gusp,
            caex,
            raro
          } as StufenCardCollection)
      )
    );
  }

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

  ////////////////////////////////////
  ///////// Stufen Teasers /////////////
  ////////////////////////////////////

  private requireStufenTeasers$: Observable<
    StufenCardCollection
  > = this.store$.select(selectStufenInfosNeedTeaser).pipe(
    filter(needTeasers => needTeasers),
    tap(() => this.store$.dispatch(loadAllStufenTeasersAction())),
    switchMap(() => this.getStufenTeasers$()),
    tap(stufenTeasers =>
      this.store$.dispatch(
        loadAllStufenTeasersSuccessAction({
          payload: {
            ...stufenTeasers
          }
        })
      )
    ),
    catchError(err => {
      this.store$.dispatch(loadAllStufenTeasersErrorAction(err));
      return throwError(err);
    }),
    share()
  );

  private getStufenTeasers$() {
    return combineLatest([
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.biber,
          WordpressDictionary.tags.teaser
        )
        .pipe(
          map(
            post =>
              <StufenCardModel>{
                stufenUri: ["stufe", "biber"],
                title: post.title.rendered,
                shortDescription: post.excerpt.rendered,
                fullDescription: this.removeHtmlPipe.transform(
                  post.content.rendered
                ),
                imgUrl: post._embedded["wp:featuredmedia"][0].source_url
              }
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.wiwoe,
          WordpressDictionary.tags.teaser
        )
        .pipe(
          map(
            post =>
              <StufenCardModel>{
                stufenUri: ["stufe", "wiwoe"],
                title: post.title.rendered,
                shortDescription: post.excerpt.rendered,
                fullDescription: this.removeHtmlPipe.transform(
                  post.content.rendered
                ),
                imgUrl: post._embedded["wp:featuredmedia"][0].source_url
              }
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.gusp,
          WordpressDictionary.tags.teaser
        )
        .pipe(
          map(
            post =>
              <StufenCardModel>{
                stufenUri: ["stufe", "gusp"],
                title: post.title.rendered,
                shortDescription: post.excerpt.rendered,
                fullDescription: this.removeHtmlPipe.transform(
                  post.content.rendered
                ),
                imgUrl: post._embedded["wp:featuredmedia"][0].source_url
              }
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.caex,
          WordpressDictionary.tags.teaser
        )
        .pipe(
          map(
            post =>
              <StufenCardModel>{
                stufenUri: ["stufe", "caex"],
                title: post.title.rendered,
                shortDescription: post.excerpt.rendered,
                fullDescription: this.removeHtmlPipe.transform(
                  post.content.rendered
                ),
                imgUrl: post._embedded["wp:featuredmedia"][0].source_url
              }
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.raro,
          WordpressDictionary.tags.teaser
        )
        .pipe(
          map(
            post =>
              <StufenCardModel>{
                stufenUri: ["stufe", "raro"],
                title: post.title.rendered,
                shortDescription: post.excerpt.rendered,
                fullDescription: this.removeHtmlPipe.transform(
                  post.content.rendered
                ),
                imgUrl: post._embedded["wp:featuredmedia"][0].source_url
              }
          )
        )
    ]).pipe(
      map(
        ([biber, wiwoe, gusp, caex, raro]) =>
          ({
            biber,
            wiwoe,
            gusp,
            caex,
            raro
          } as StufenCardCollection)
      )
    );
  }

  public stufenTeasersAll$ = this.muteFirst(
    this.requireStufenTeasers$.pipe(startWith(null)),
    this.store$
      .select(selectTeasersAll)
      .pipe(
        map(stufenTeasers => [
          stufenTeasers.biber,
          stufenTeasers.wiwoe,
          stufenTeasers.gusp,
          stufenTeasers.caex,
          stufenTeasers.raro
        ])
      )
  );

  public stufenTeaserBiber$ = this.muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectBiberTeaser)
  );

  public stufenTeaserWiWoe$ = this.muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectWiWoeTeaser)
  );

  public stufenTeaserGuSp$ = this.muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectGuSpTeaser)
  );

  public stufenTeaserCaEx$ = this.muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectCaExTeaser)
  );

  public stufenTeaserRaRo$ = this.muteFirst(
    this.requireStufenInfos$.pipe(startWith(null)),
    this.store$.select(selectRaRoTeaser)
  );

  ////////////////////////////////////
  ///////////// TeamPosts ////////////
  ////////////////////////////////////

  teamPostsBiber$: Observable<
    TeamCardCollectionModel
  > = this.wordpressService
    .getPostsByCategoryIdAndTagId$(
      WordpressDictionary.categories.biber,
      WordpressDictionary.tags.team
    )
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
                  imgUrl: post._embedded["wp:featuredmedia"]
                    ? post._embedded["wp:featuredmedia"][0].media_details.sizes
                        .large.source_url
                    : undefined
                } as TeamCardModel)
            )
          } as TeamCardCollectionModel)
      )
    );

  teamPostsWiWoe$: Observable<
    TeamCardCollectionModel
  > = this.wordpressService
    .getPostsByCategoryIdAndTagId$(
      WordpressDictionary.categories.wiwoe,
      WordpressDictionary.tags.team
    )
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
                  imgUrl: post._embedded["wp:featuredmedia"]
                    ? post._embedded["wp:featuredmedia"][0].media_details.sizes
                        .large.source_url
                    : undefined
                } as TeamCardModel)
            )
          } as TeamCardCollectionModel)
      )
    );

  teamPostsGuSp$: Observable<
    TeamCardCollectionModel
  > = this.wordpressService
    .getPostsByCategoryIdAndTagId$(
      WordpressDictionary.categories.gusp,
      WordpressDictionary.tags.team
    )
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
                  imgUrl: post._embedded["wp:featuredmedia"]
                    ? post._embedded["wp:featuredmedia"][0].media_details.sizes
                        .large.source_url
                    : undefined
                } as TeamCardModel)
            )
          } as TeamCardCollectionModel)
      )
    );

  teamPostsCaEx$: Observable<
    TeamCardCollectionModel
  > = this.wordpressService
    .getPostsByCategoryIdAndTagId$(
      WordpressDictionary.categories.caex,
      WordpressDictionary.tags.team
    )
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
                  imgUrl: post._embedded["wp:featuredmedia"]
                    ? post._embedded["wp:featuredmedia"][0].media_details.sizes
                        .large.source_url
                    : undefined
                } as TeamCardModel)
            )
          } as TeamCardCollectionModel)
      )
    );

  teamPostsRaRo$: Observable<
    TeamCardCollectionModel
  > = this.wordpressService
    .getPostsByCategoryIdAndTagId$(
      WordpressDictionary.categories.raro,
      WordpressDictionary.tags.team
    )
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
                  imgUrl: post._embedded["wp:featuredmedia"]
                    ? post._embedded["wp:featuredmedia"][0].media_details.sizes
                        .large.source_url
                    : undefined
                } as TeamCardModel)
            )
          } as TeamCardCollectionModel)
      )
    );
  ////////////////////////////////////
  ///////// HeimstundenInfos /////////
  ////////////////////////////////////

  private requireHeimstundenInfos$ = this.store$
    .select(selectStufenInfosNeedHeimstundenInfos)
    .pipe(
      filter(needHeimstundenInfos => needHeimstundenInfos),
      tap(() => this.store$.dispatch(loadAllHeimstundenAction())),
      switchMap(() => this.getHeimstundenInfos$()),
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

  private getHeimstundenInfos$(): Observable<StufenHeimstundenCollection> {
    return combineLatest([
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.biber,
          WordpressDictionary.tags.time
        )
        .pipe(
          map(
            post =>
              ({
                title: post.title.rendered,
                timeDescription: post.content.rendered
              } as StufenHeimstundenInfoState)
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.wiwoe,
          WordpressDictionary.tags.time
        )
        .pipe(
          map(
            post =>
              ({
                title: post.title.rendered,
                timeDescription: post.content.rendered
              } as StufenHeimstundenInfoState)
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.gusp,
          WordpressDictionary.tags.time
        )
        .pipe(
          map(
            post =>
              ({
                title: post.title.rendered,
                timeDescription: post.content.rendered
              } as StufenHeimstundenInfoState)
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.caex,
          WordpressDictionary.tags.time
        )
        .pipe(
          map(
            post =>
              ({
                title: post.title.rendered,
                timeDescription: post.content.rendered
              } as StufenHeimstundenInfoState)
          )
        ),
      this.wordpressService
        .getPostByCategoryIdAndTagId$(
          WordpressDictionary.categories.raro,
          WordpressDictionary.tags.time
        )
        .pipe(
          map(
            post =>
              ({
                title: post.title.rendered,
                timeDescription: post.content.rendered
              } as StufenHeimstundenInfoState)
          )
        )
    ]).pipe(
      map(
        ([biber, wiwoe, gusp, caex, raro]) =>
          ({
            biber,
            wiwoe,
            gusp,
            caex,
            raro
          } as StufenHeimstundenCollection)
      )
    );
  }

  heimstundenBiber$ = this.muteFirst(
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
