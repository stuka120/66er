import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { WordpressPostResponseModel } from "../model/responses/wordpress/wordpress-post-response.model";
import { RootState } from "../../root-store/root-state";
import { Store } from "@ngrx/store";
import { selectPostsNeedPosts, selectPostsPosts } from "../../root-store/posts-store/selectors";
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  share,
  startWith,
  switchMap,
  tap,
  withLatestFrom
} from "rxjs/operators";
import { loadNewsAction, loadNewsErrorAction, loadNewsSuccessAction } from "../../root-store/posts-store/actions";
import { MyFacebookService } from "../services/facebook/my-facebook.service";

@Injectable()
export class MyFacebookFacade {
  constructor(private myFacebookService: MyFacebookService, private store$: Store<RootState>) {}

  private requirePostCollection(): Observable<WordpressPostResponseModel[]> {
    return this.store$.select(selectPostsNeedPosts).pipe(
      filter((needPosts) => needPosts),
      tap(() => this.store$.dispatch(loadNewsAction())),
      switchMap(() => this.myFacebookService.getPosts$()),
      catchError((err) => {
        this.store$.dispatch(loadNewsErrorAction(err));
        return throwError(err);
      }),
      tap((posts) => this.store$.dispatch(loadNewsSuccessAction({ payload: { posts: posts } }))),
      share()
    );
  }

  posts$: Observable<WordpressPostResponseModel[]> = this.requirePostCollection().pipe(
    startWith(null),
    withLatestFrom(this.store$.select(selectPostsPosts)),
    map(([, second]) => second),
    distinctUntilChanged()
  );
}
