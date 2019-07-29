import { Component, OnInit } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { Post } from "../../model/post.model";
import { MyFacebookService } from "../../services/my-facebook.service";
import { WordpressService } from "src/app/services/wordpress.service";
import { StufenCardModel } from "src/app/model/stufen-card.model";
import { map } from "rxjs/operators";

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
    private wordpressService: WordpressService
  ) {}

  ngOnInit(): void {
    this.posts$ = this.myFacebookService.getPosts$();
    this.stufenCardModels$ = combineLatest([
      this.wordpressService.getPage$(6).pipe(
        map(
          page =>
            <StufenCardModel>{
              title: page.title.rendered,
              description: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl:
                "http://test3.66er.net/wp-content/uploads/2019/03/biber_herz.jpg"
            }
        )
      ),
      this.wordpressService.getPage$(14).pipe(
        map(
          page =>
            <StufenCardModel>{
              title: page.title.rendered,
              description: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl:
                "http://test3.66er.net/wp-content/uploads/2019/03/Download.png"
            }
        )
      ),
      this.wordpressService.getPage$(26).pipe(
        map(
          page =>
            <StufenCardModel>{
              title: page.title.rendered,
              description: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl:
                "http://test3.66er.net/wp-content/uploads/2019/03/gusp_logo.png"
            }
        )
      ),
      this.wordpressService.getPage$(28).pipe(
        map(
          page =>
            <StufenCardModel>{
              title: page.title.rendered,
              description: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl:
                "http://test3.66er.net/wp-content/uploads/2019/03/caexlogo1-300x165.jpg"
            }
        )
      ),
      this.wordpressService.getPage$(30).pipe(
        map(
          page =>
            <StufenCardModel>{
              title: page.title.rendered,
              description: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl:
                "http://test3.66er.net/wp-content/uploads/2019/03/biber_herz.jpg"
            }
        )
      )
    ]).pipe(
      map(([biber, wiwo, gusp, caex, raro]) => [biber, wiwo, gusp, caex, raro])
    );
  }
}
