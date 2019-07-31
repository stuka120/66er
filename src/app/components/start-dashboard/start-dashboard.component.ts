import { Component, OnInit } from "@angular/core";
import { combineLatest, Observable, throwError } from "rxjs";
import { Post } from "../../model/post.model";
import { MyFacebookService } from "../../services/my-facebook.service";
import { WordpressService } from "src/app/services/wordpress.service";
import { StufenCardModel } from "src/app/model/stufen-card.model";
import { catchError, filter, map, switchMap, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { StartDashboardState } from "../../root-store/start-dashboard-store";
import {
  loadNewsAction,
  loadNewsErrorAction,
  loadNewsSuccessAction
} from "src/app/root-store/start-dashboard-store/actions";
import { selectStartDashboardNeedsPosts } from "../../root-store/start-dashboard-store/selectors";

@Component({
  selector: "app-start-dashboard",
  templateUrl: "./start-dashboard.component.html",
  styleUrls: ["./start-dashboard.component.css"]
})
export class StartDashboardComponent implements OnInit {
  posts$: Observable<Post[]>;
  stufenCardModels$: Observable<StufenCardModel[]>;

  constructor(
    private myFacebookService: MyFacebookService,
    private wordpressService: WordpressService,
    private store$: Store<StartDashboardState.State>
  ) {}

  ngOnInit(): void {
    this.posts$ = this.store$.select(selectStartDashboardNeedsPosts).pipe(
      filter(needsPosts => needsPosts),
      tap(() => this.store$.dispatch(loadNewsAction())),
      switchMap(() => this.myFacebookService.getPosts$()),
      tap(posts =>
        this.store$.dispatch(
          loadNewsSuccessAction({ payload: { posts: posts } })
        )
      ),
      catchError(err => {
        loadNewsErrorAction({ payload: { error: err } });
        return throwError(err);
      })
    );

    this.stufenCardModels$ = this.wordpressService.getStufenInfos$();
  }
}
