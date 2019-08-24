import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, combineLatest } from "rxjs";
import { WordpressPageModel } from "../model/wordpress-page.model";
import { WordpressMediaResponseDto } from "../model/wordpress-media-response.dto";
import { filter, map } from "rxjs/operators";
import {
  StufenCardCollection,
  StufenCardModel
} from "../model/stufen-card.model";
import { WordpressPostResponseModel } from "./WordpressResponseModel.model";
import { WordpressDictionary } from "../dictionary/wordpress.dictionary";
import { RemoveHtmlPipe } from "../pipes/remove-html.pipe";

@Injectable()
export class WordpressService {
  constructor(
    private httpClient: HttpClient,
    private removeHtmlPipe: RemoveHtmlPipe
  ) {}

  public getPage$(id: number): Observable<WordpressPageModel> {
    return this.httpClient.get<WordpressPageModel>(
      `http://test3.66er.net/wp-json/wp/v2/pages/${id}`
    );
  }

  public getPost$(postId: number): Observable<WordpressPostResponseModel> {
    return this.httpClient.get<WordpressPostResponseModel>(
      `http://test3.66er.net/wp-json/wp/v2/posts/${postId}?_embed`
    );
  }

  public getPostsByCategoryId$(
    categoryId: number
  ): Observable<WordpressPostResponseModel[]> {
    return this.httpClient.get<WordpressPostResponseModel[]>(
      `http://test3.66er.net/wp-json/wp/v2/posts/?_embed&categories=${categoryId}`
    );
  }

  public getPostByCategoryIdAndTagId$(
    categoryId: number,
    tagId: number
  ): Observable<WordpressPostResponseModel> {
    return this.httpClient
      .get<WordpressPostResponseModel[]>(
        `http://test3.66er.net/wp-json/wp/v2/posts/?_embed&categories=${categoryId}&tags=${tagId}`
      )
      .pipe(
        filter(posts => !!posts && posts.length > 0),
        map(posts => posts[0])
      );
  }

  public getMedia$(
    categoryName: string
  ): Observable<WordpressMediaResponseDto[]> {
    return this.httpClient.get<WordpressMediaResponseDto[]>(
      `http://test3.66er.net/wp-json/wp/v2/media?search=${categoryName}`
    );
  }

  public getStufenInfos$(): Observable<StufenCardCollection> {
    return combineLatest([
      this.getPostByCategoryIdAndTagId$(
        WordpressDictionary.categories.biber.content,
        WordpressDictionary.tags.content
      ).pipe(
        map(
          post =>
            <StufenCardModel>{
              stufenUri: ["stufe", "biber"],
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: this.removeHtmlPipe.transform(
                post.content.rendered
              ),
              imgUrl: "http://test3.66er.net/wp-content/uploads/biber.jpg"
            }
        )
      ),
      this.getPostByCategoryIdAndTagId$(
        WordpressDictionary.categories.wiwoe.content,
        WordpressDictionary.tags.content
      ).pipe(
        map(
          post =>
            <StufenCardModel>{
              stufenUri: ["stufe", "wiwoe"],
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: this.removeHtmlPipe.transform(
                post.content.rendered
              ),
              imgUrl: "http://test3.66er.net/wp-content/uploads/wiwoe.jpg"
            }
        )
      ),
      this.getPostByCategoryIdAndTagId$(
        WordpressDictionary.categories.gusp.content,
        WordpressDictionary.tags.content
      ).pipe(
        map(
          post =>
            <StufenCardModel>{
              stufenUri: ["stufe", "gusp"],
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: this.removeHtmlPipe.transform(
                post.content.rendered
              ),
              imgUrl: "http://test3.66er.net/wp-content/uploads/gusp.png"
            }
        )
      ),
      this.getPostByCategoryIdAndTagId$(
        WordpressDictionary.categories.caex.content,
        WordpressDictionary.tags.content
      ).pipe(
        map(
          post =>
            <StufenCardModel>{
              stufenUri: ["stufe", "caex"],
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: this.removeHtmlPipe.transform(
                post.content.rendered
              ),
              imgUrl: "http://test3.66er.net/wp-content/uploads/caex.jpg"
            }
        )
      ),
      this.getPostByCategoryIdAndTagId$(
        WordpressDictionary.categories.raro.content,
        WordpressDictionary.tags.content
      ).pipe(
        map(
          post =>
            <StufenCardModel>{
              stufenUri: ["stufe", "raro"],
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: this.removeHtmlPipe.transform(
                post.content.rendered
              ),
              imgUrl: "http://test3.66er.net/wp-content/uploads/raro.png"
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
}
