import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, combineLatest } from "rxjs";
import { WordpressPageModel } from "../model/wordpress-page.model";
import {
  WordpressMediaModel,
  WordpressFileModel
} from "../model/wordpress-media.model";
import { map } from "rxjs/operators";
import {
  StufenCardCollection,
  StufenCardModel
} from "../model/stufen-card.model";
import { StufenInfoStoreModule } from "../root-store/stufen-info-store";
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

  public getMedia$(): Observable<WordpressMediaModel[]> {
    return this.httpClient.get<WordpressMediaModel[]>(
      "http://test3.66er.net/wp-json/wp/v2/media"
    );
  }

  public getFiles$(): Observable<WordpressFileModel[]> {
    return this.getMedia$().pipe(
      map(medias =>
        medias
          .filter(media => media.media_type === "file")
          .map(
            media =>
              <WordpressFileModel>{
                id: media.id,
                title: media.title.rendered.startsWith("_")
                  ? media.title.rendered.split("_")[2]
                  : media.title.rendered.split("_")[1],
                isVisible: !media.title.rendered.startsWith("_"),
                source_url: media.source_url,
                mime_type: media.media_type,
                fileGroup: media.title.rendered.startsWith("_")
                  ? media.title.rendered.split("_")[1]
                  : media.title.rendered.split("_")[0]
              }
          )
      )
    );
  }

  public getStufenInfos$(): Observable<StufenCardCollection> {
    return combineLatest([
      this.getPage$(6).pipe(
        map(
          page =>
            <StufenCardModel>{
              stufenUri: ["stufe", "biber"],
              title: page.title.rendered,
              shortDescription: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              fullDescription: page.content.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl: "http://test3.66er.net/wp-content/uploads/biber.jpg"
            }
        )
      ),
      this.getPage$(14).pipe(
        map(
          page =>
            <StufenCardModel>{
              stufenUri: ["stufe", "wiwoe"],
              title: page.title.rendered,
              shortDescription: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              fullDescription: page.content.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl: "http://test3.66er.net/wp-content/uploads/wiwoe.jpg"
            }
        )
      ),
      this.getPage$(26).pipe(
        map(
          page =>
            <StufenCardModel>{
              stufenUri: ["stufe", "gusp"],
              title: page.title.rendered,
              shortDescription: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              fullDescription: page.content.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl: "http://test3.66er.net/wp-content/uploads/gusp.png"
            }
        )
      ),
      this.getPage$(28).pipe(
        map(
          page =>
            <StufenCardModel>{
              stufenUri: ["stufe", "caex"],
              title: page.title.rendered,
              shortDescription: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              fullDescription: page.content.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl: "http://test3.66er.net/wp-content/uploads/caex.jpg"
            }
        )
      ),
      this.getPage$(30).pipe(
        map(
          page =>
            <StufenCardModel>{
              stufenUri: ["stufe", "raro"],
              title: page.title.rendered,
              shortDescription: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              fullDescription: page.content.rendered.replace(/<[^>]+>/gm, ""),
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
