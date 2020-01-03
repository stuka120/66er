import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post, PostResponse} from "../model/post.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class MyFacebookService {
  constructor(private httpClient: HttpClient) {}

  public getPosts$(): Observable<Post[]> {
    return this.httpClient
      .get<PostResponse>('https://www.66er.net/wp-json/facebook/v1/posts')
      .pipe(map(postReponse => postReponse.data));
  }
}
