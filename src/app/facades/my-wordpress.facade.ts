import { Injectable } from "@angular/core";
import { catchError, map, startWith } from "rxjs/operators";
import { WordpressService } from "../services/wordpress.service";
import { Observable, of } from "rxjs";
import { HeroBannerModel } from "../components/components/hero-banner/hero-banner.model";
import { WordpressCategoryEnum } from "../dictionary/wordpress-category.enum";
import { WordpressTagEnum } from "../dictionary/wordpress-tag.enum";

@Injectable({
  providedIn: "root"
})
export class MyWordpressFacade {
  constructor(private wordpressService: WordpressService) {}

  getStartseiteBanner$(): Observable<HeroBannerModel> {
    return this.getBannerUrlForCategory$(WordpressCategoryEnum.Startseite).pipe(
      map(imageUrl => ({
        imageUrl: imageUrl,
        morphextPrefix: "Wir sind ",
        morpext: "Biber, WiWö, GuSp, CaEx, RaRo, die 66er!"
      })),
      startWith({
        imageUrl: undefined,
        morphextPrefix: "Wir sind ",
        morpext: "Biber, WiWö, GuSp, CaEx, RaRo, die 66er!"
      })
    );
  }

  getBannerUrlForCategory$(
    categoryId: WordpressCategoryEnum
  ): Observable<string | undefined> {
    return this.wordpressService
      .getPostByCategoryIdAndTagId$(categoryId, WordpressTagEnum.BannerImage)
      .pipe(
        catchError(() => of(undefined)),
        map(post =>
          post ? post._embedded["wp:featuredmedia"][0].source_url : undefined
        )
      );
  }
}
