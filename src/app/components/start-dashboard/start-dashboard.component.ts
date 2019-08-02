import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {Post} from "../../model/post.model";
import {MyFacebookService} from "../../services/my-facebook.service";
import {WordpressService} from "src/app/services/wordpress.service";
import {
  StufenCardModel
} from "src/app/model/stufen-card.model";
import {
  catchError,
  filter,
  map,
  switchMap,
  tap
} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {
  loadNewsAction,
  loadNewsErrorAction,
  loadNewsSuccessAction
} from "src/app/root-store/posts-store/actions";
import {
  selectPostsIsLoading,
  selectPostsNeedPosts
} from "../../root-store/posts-store/selectors";
import {RootState} from "../../root-store/root-state";
import {
  selectStufenInfosIsLoading,
  selectStufenInfosNeedStufenInfos
} from "../../root-store/stufen-info-store/selectors";
import {
  loadAllStufenAction,
  loadAllStufenErrorAction,
  loadAllStufenSuccessAction
} from "../../root-store/stufen-info-store/actions";

@Component({
  selector: "app-start-dashboard",
  templateUrl: "./start-dashboard.component.html",
  styleUrls: ["./start-dashboard.component.css"]
})
export class StartDashboardComponent implements OnInit, AfterViewInit {

  posts$: Observable<Post[]>;
  stufenCardModels$: Observable<StufenCardModel[]>;
  isLoadingPosts$: Observable<boolean>;
  isLoadingStufenInfos$: Observable<boolean>;

  // @ts-ignore
  @ViewChild("morphextElement")
  nativeMorphextContainer: ElementRef;
  morphextText: any;

  constructor(
    private myFacebookService: MyFacebookService,
    private wordpressService: WordpressService,
    private store$: Store<RootState>
  ) {
  }

  ngAfterViewInit(): void {
    this.morphextText = $(this.nativeMorphextContainer.nativeElement)
    this.morphextText.Morphext({
      animation: "fadeIn", // Overrides default "bounceIn"
      separator: ",", // Overrides default ","
      speed: 3000 // Overrides default 2000
    });
  }

  ngOnInit(): void {
    this.isLoadingPosts$ = this.store$.select(selectPostsIsLoading);
    this.isLoadingStufenInfos$ = this.store$.select(selectStufenInfosIsLoading);

    this.posts$ = this.store$.select(selectPostsNeedPosts).pipe(
      filter(needPosts => needPosts),
      tap(() => this.store$.dispatch(loadNewsAction())),
      switchMap(() => this.myFacebookService.getPosts$()),
      tap(posts =>
        this.store$.dispatch(
          loadNewsSuccessAction({payload: {posts}})
        )
      ),
      catchError(err => {
        loadNewsErrorAction({payload: {error: err}});
        return throwError(err);
      })
    );

    this.stufenCardModels$ = this.store$
      .select(selectStufenInfosNeedStufenInfos)
      .pipe(
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
        map(stufenInfos => [
          stufenInfos.biber,
          stufenInfos.wiwoe,
          stufenInfos.gusp,
          stufenInfos.caex,
          stufenInfos.raro
        ]),
        catchError(err => {
          this.store$.dispatch(loadAllStufenErrorAction(err));
          return throwError(err);
        })
      );
  }
}
