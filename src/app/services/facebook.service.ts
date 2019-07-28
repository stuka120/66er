import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post, PostResponse } from "../model/post.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class FacebookService {
  private siteAccessKey =
    "EAAiKjiZARNf4BAP311fZB7buBuNFwLJbNNAhj8gpBZBtPEz0t7tzg1IbaxAUUDL5ZAoM0wVRjLAlKhwZAiC6OceKKuw3b2MgX2MkVTYcePgHunMG2A64ZCYZC4jPfHWjYJVjuqUFCIcnLH0al1erdsVuZCmGYi4oRaVtAFcXLZCcGWwGkC1ku9ZCKU0VLQZA84KTnIZD";

  constructor(private httpClient: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return this.httpClient
      .get<PostResponse>(
        `https://graph.facebook.com/v3.3/pfadfindergruppe66/feed?fields=message%2Ccreated_time%2Cfull_picture%2Cattachments%7Btitle%2Cmedia%2Cdescription%2Csubattachments%7D&limit=7&access_token=${this.siteAccessKey}`
      )
      .pipe(map(postReponse => postReponse.data));
  }
}
