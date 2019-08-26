import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from "@angular/core";
import { combineLatest, Observable, throwError } from "rxjs";
import { Post } from "../../model/post.model";
import { MyFacebookService } from "../../services/my-facebook.service";
import { WordpressService } from "src/app/services/wordpress.service";
import {
  StufenCardCollection,
  StufenCardModel
} from "src/app/model/stufen-card.model";
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  share,
  shareReplay,
  startWith,
  switchMap,
  tap,
  withLatestFrom
} from "rxjs/operators";
import { Store } from "@ngrx/store";
import {
  loadNewsAction,
  loadNewsErrorAction,
  loadNewsSuccessAction
} from "src/app/root-store/posts-store/actions";
import {
  selectPostsIsLoading,
  selectPostsNeedPosts,
  selectPostsPosts
} from "../../root-store/posts-store/selectors";
import { RootState } from "../../root-store/root-state";
import {
  selectStufenInfosAll,
  selectStufenInfosIsLoading,
  selectStufenInfosNeedStufenInfos
} from "../../root-store/stufen-info-store/selectors";
import {
  loadAllStufenAction,
  loadAllStufenErrorAction,
  loadAllStufenSuccessAction
} from "../../root-store/stufen-info-store/actions";
import { HeroBannerModel } from "../hero-banner/hero-banner.model";
import { StufenInfoFacade } from "../../facades/stufen-info.facade";
import { MyFacebookFacade } from "../../facades/my-facebook.facade";

@Component({
  selector: "app-start-dashboard",
  templateUrl: "./start-dashboard.component.html",
  styleUrls: ["./start-dashboard.component.css"]
})
export class StartDashboardComponent implements OnInit {
  posts$: Observable<Post[]>;
  requirePosts$: Observable<Post[]>;

  stufenCardModels$: Observable<StufenCardModel[]>;
  isLoadingPosts$: Observable<boolean>;
  isLoadingStufenInfos$: Observable<boolean>;

  heroBannerModel: HeroBannerModel = {
    imageUrl: "http://test3.66er.net/wp-content/uploads/2019/03/titelbild.jpg",
    buttonText: "Aktuelles",
    morphextPrefix: "Wir sind ",
    morpext: "Biber, WiWö, GuSp, CaEx, RaRo, die 66er!"
  };

  constructor(
    private myFacebookFacade: MyFacebookFacade,
    private wordpressService: WordpressService,
    private store$: Store<RootState>,
    private stufenInfoFacade: StufenInfoFacade
  ) {}

  ngOnInit(): void {
    this.isLoadingPosts$ = this.store$.select(selectPostsIsLoading);
    this.isLoadingStufenInfos$ = this.store$.select(selectStufenInfosIsLoading);

    // ngrx injections
    this.posts$ = this.myFacebookFacade.posts$;
    this.stufenCardModels$ = this.stufenInfoFacade.stufenTeasersAll$;
  }
}
