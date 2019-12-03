import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WordpressPageModel } from "../model/wordpress-page.model";
import { WordpressMediaResponseDto } from "../model/wordpress-media-response.dto";
import { filter, map } from "rxjs/operators";
import { WordpressPostResponseModel } from "./WordpressResponseModel.model";
import { RemoveHtmlPipe } from "../pipes/remove-html.pipe";

@Injectable()
export class WordpressService {
  constructor(
    private httpClient: HttpClient,
    private removeHtmlPipe: RemoveHtmlPipe
  ) {}

  public getPage$(id: number): Observable<WordpressPageModel> {
    return this.httpClient.get<WordpressPageModel>(
      `http://test1.66er.net/wp-json/wp/v2/pages/${id}`
    );
  }

  public getPost$(postId: number): Observable<WordpressPostResponseModel> {
    return this.httpClient.get<WordpressPostResponseModel>(
      `http://test1.66er.net/wp-json/wp/v2/posts/${postId}?_embed`
    );
  }

  public getPostsByCategoryId$(
    categoryId: number
  ): Observable<WordpressPostResponseModel[]> {
    return this.httpClient.get<WordpressPostResponseModel[]>(
      `http://test1.66er.net/wp-json/wp/v2/posts/?_embed&categories=${categoryId}`
    );
  }

  public getPostsByCategoryIdAndTagId$(
    categoryId: number,
    tagId: number
  ): Observable<WordpressPostResponseModel[]> {
    return this.httpClient
      .get<WordpressPostResponseModel[]>(
        `http://test1.66er.net/wp-json/wp/v2/posts/?_embed&categories=${categoryId}&tags=${tagId}`
      )
      .pipe(filter(posts => !!posts && posts.length > 0));
  }

  public getPostByCategoryIdAndTagId$(
    categoryId: number,
    tagId: number
  ): Observable<WordpressPostResponseModel> {
    return this.httpClient
      .get<WordpressPostResponseModel[]>(
        `http://test1.66er.net/wp-json/wp/v2/posts/?_embed&categories=${categoryId}&tags=${tagId}`
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
      `http://test1.66er.net/wp-json/wp/v2/media?search=${categoryName}`
    );
  }
}
