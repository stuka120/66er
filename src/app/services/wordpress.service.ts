import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, combineLatest} from "rxjs";
import {WordpressPageModel} from "../model/wordpress-page.model";
import {
  WordpressMediaModel,
  WordpressFileModel
} from "../model/wordpress-media.model";
import {map} from "rxjs/operators";
import {
  StufenCardCollection,
  StufenCardModel
} from "../model/stufen-card.model";
import {StufenInfoStoreModule} from "../root-store/stufen-info-store";

@Injectable()
export class WordpressService {
  constructor(private httpClient: HttpClient) {
  }

  public getPage$(id: number): Observable<WordpressPageModel> {
    return this.httpClient.get<WordpressPageModel>(
      `http://test3.66er.net/wp-json/wp/v2/pages/${id}`
    );
  }

  public getPages$(): Observable<WordpressPageModel[]> {
    return this.httpClient.get<WordpressPageModel[]>(
      "http://test3.66er.net/wp-json/wp/v2/pages"
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
              title: page.title.rendered,
              shortDescription: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              fullDescription: page.content.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl:
                "http://test3.66er.net/wp-content/uploads/2019/03/biber_herz.jpg"
            }
        )
      ),
      this.getPage$(14).pipe(
        map(
          page =>
            <StufenCardModel>{
              title: page.title.rendered,
              shortDescription: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              fullDescription: page.content.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl:
                "http://test3.66er.net/wp-content/uploads/2019/03/Download.png"
            }
        )
      ),
      this.getPage$(26).pipe(
        map(
          page =>
            <StufenCardModel>{
              title: page.title.rendered,
              shortDescription: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              fullDescription: page.content.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl:
                "http://test3.66er.net/wp-content/uploads/2019/03/gusp_logo.png"
            }
        )
      ),
      this.getPage$(28).pipe(
        map(
          page =>
            <StufenCardModel>{
              title: page.title.rendered,
              shortDescription: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              fullDescription: page.content.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl:
                "http://test3.66er.net/wp-content/uploads/2019/03/caexlogo1-300x165.jpg"
            }
        )
      ),
      this.getPage$(30).pipe(
        map(
          page =>
            <StufenCardModel>{
              title: page.title.rendered,
              shortDescription: page.excerpt.rendered.replace(/<[^>]+>/gm, ""),
              fullDescription: page.content.rendered.replace(/<[^>]+>/gm, ""),
              imgUrl:
                "http://test3.66er.net/wp-content/uploads/2019/03/biber_herz.jpg"
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
