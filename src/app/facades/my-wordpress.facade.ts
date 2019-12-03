import { Injectable } from "@angular/core";
import { WordpressDictionary } from "../dictionary/wordpress.dictionary";
import { catchError, filter, map, startWith } from "rxjs/operators";
import { WordpressService } from "../services/wordpress.service";
import { Observable, of } from "rxjs";
import { HeroBannerModel } from "../components/hero-banner/hero-banner.model";
import { Post } from "../model/post.model";
import { WordpressPostResponseModel } from "../services/WordpressResponseModel.model";

@Injectable({
  providedIn: "root"
})
export class MyWordpressFacade {
  constructor(private wordpressService: WordpressService) {}

  getStartseiteBanner$(): Observable<HeroBannerModel> {
    return this.getBannerUrlForCategory$(
      WordpressDictionary.categories.startseite
    ).pipe(
      map(imageUrl => ({
        imageUrl: imageUrl,
        buttonText: "Aktuelles",
        morphextPrefix: "Wir sind ",
        morpext: "Biber, WiWö, GuSp, CaEx, RaRo, die 66er!"
      })),
      startWith({
        imageUrl: undefined,
        buttonText: "Aktuelles",
        morphextPrefix: "Wir sind ",
        morpext: "Biber, WiWö, GuSp, CaEx, RaRo, die 66er!"
      })
    );
  }

  getBannerUrlForCategory$(categoryId: number): Observable<string> {
    return this.wordpressService
      .getPostByCategoryIdAndTagId$(
        categoryId,
        WordpressDictionary.tags.bannerImage
      )
      .pipe(
        catchError(() => of(undefined)),
        map(post =>
          post ? post._embedded["wp:featuredmedia"][0].source_url : undefined
        )
      );
  }
}
