import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { WordpressFileModel } from "../model/wordpressFile.model";

@Injectable()
export class WordpressService {
  constructor(private httpClient: HttpClient) {}

  public getMedia(): Observable<WordpressFileModel[]> {
    return this.httpClient.get<WordpressFileModel[]>(
      "http://test1.66er.net/wp-json/wp/v2/pages"
    );
  }
}
