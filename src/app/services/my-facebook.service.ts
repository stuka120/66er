import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post, PostResponse} from "../model/post.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class MyFacebookService {
  private siteAccessKey =
    "EAAiKjiZARNf4BABk3rYibIgWX5sZAuXgzU5raXivjfHHAvbG2kZC2yHzEKBvU9T3DQS0qLmOYSSEmVzb8TANRikmSPZBzlisIRWf2ZBRCOgAdFOTN59M8eFtf6F0KcQd7Oy6dXKjK8m6fsIausF3s21wqlUYaKOq4d8F5Dr3UoAZDZD";

  constructor(private httpClient: HttpClient) {
  }

  public getPosts$(): Observable<Post[]> {
    return this.httpClient
      .get<PostResponse>(
        `https://graph.facebook.com/v4.0/pfadfindergruppe66/feed?fields=message,created_time,full_picture,attachments{title,media,description,subattachments},comments,shares&limit=7&access_token=${this.siteAccessKey}`
      )
      .pipe(map(postReponse => postReponse.data));
  }
}
