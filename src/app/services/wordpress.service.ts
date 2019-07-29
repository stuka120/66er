import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, from, of } from "rxjs";
import { WordpressPageModel } from "../model/wordpress-page.model";
import { WordpressMediaModel, WordpressFileModel } from '../model/wordpress-media.model';
import { filter, map, groupBy, tap } from 'rxjs/operators';

@Injectable()
export class WordpressService {
  constructor(private httpClient: HttpClient) {}

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
      map(medias => medias.filter(media => media.media_type == "file").map(
        media => 
        <WordpressFileModel>{
          id: media.id,
          title: media.title.rendered.startsWith("_") ? media.title.rendered.split("_")[2] : media.title.rendered.split("_")[1],
          isVisible: !media.title.rendered.startsWith("_"),
          source_url: media.source_url,
          mime_type: media.media_type,
          fileGroup: media.title.rendered.startsWith("_") ? media.title.rendered.split("_")[1] : media.title.rendered.split("_")[0]
        }
      ))
    )
  }
}
