import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, combineLatest } from "rxjs";
import { WordpressPageModel } from "../model/wordpress-page.model";
import { WordpressMediaResponseDto } from "../model/wordpress-media-response.dto";
import { map } from "rxjs/operators";
import {
  StufenCardCollection,
  StufenCardModel
} from "../model/stufen-card.model";
import { WordpressPostResponseModel } from "./WordpressResponseModel.model";

@Injectable()
export class WordpressService {
  constructor(private httpClient: HttpClient) {}

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

  public getMedia$(
    categoryName: string
  ): Observable<WordpressMediaResponseDto[]> {
    return this.httpClient.get<WordpressMediaResponseDto[]>(
      `http://test3.66er.net/wp-json/wp/v2/media?search=${categoryName}`
    );
  }

  public getStufenInfos$(): Observable<StufenCardCollection> {
    return combineLatest([
      this.getPost$(170).pipe(
        map(
          post =>
            <StufenCardModel>{
              stufenUri: ["stufe", "biber"],
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: post.content.rendered,
              imgUrl: "http://test3.66er.net/wp-content/uploads/biber.jpg"
            }
        )
      ),
      this.getPost$(157).pipe(
        map(
          post =>
            <StufenCardModel>{
              stufenUri: ["stufe", "wiwoe"],
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: post.content.rendered,
              imgUrl: "http://test3.66er.net/wp-content/uploads/wiwoe.jpg"
            }
        )
      ),
      this.getPost$(172).pipe(
        map(
          post =>
            <StufenCardModel>{
              stufenUri: ["stufe", "gusp"],
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: post.content.rendered,
              imgUrl: "http://test3.66er.net/wp-content/uploads/gusp.png"
            }
        )
      ),
      this.getPost$(174).pipe(
        map(
          post =>
            <StufenCardModel>{
              stufenUri: ["stufe", "caex"],
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: post.content.rendered,
              imgUrl: "http://test3.66er.net/wp-content/uploads/caex.jpg"
            }
        )
      ),
      this.getPost$(176).pipe(
        map(
          post =>
            <StufenCardModel>{
              stufenUri: ["stufe", "raro"],
              title: post.title.rendered,
              shortDescription: post.excerpt.rendered,
              fullDescription: post.content.rendered,
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
