import {Injectable} from "@angular/core";
import {catchError, map, startWith, tap} from "rxjs/operators";
import {WordpressService} from "../services/wordpress.service";
import {Observable, of} from "rxjs";
import {HeroBannerComponentModel} from "../components/components/hero-banner/hero-banner.component-model";
import {WordpressCategoryEnum} from "../dictionary/wordpress-category.enum";
import {WordpressTagEnum} from "../dictionary/wordpress-tag.enum";
import {EventService} from "../services/event.service";
import {EventCardComponentModel} from "../components/components/event-card/event-card.component-model";

@Injectable({
  providedIn: "root"
})
export class MyWordpressFacade {
  constructor(private wordpressService: WordpressService, private eventService: EventService) {
  }

  getStartseiteBanner$(): Observable<HeroBannerComponentModel> {
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
      .getWordpressPostByCategoryAndTag$(categoryId, WordpressTagEnum.BannerImage)
      .pipe(
        catchError(() => of(undefined)),
        map(post =>
          post ? post._embedded["wp:featuredmedia"][0].source_url : undefined
        )
      );
  }

  getEvents$(): Observable<EventCardComponentModel[]> {
    return this.eventService.getEvents$().pipe(
      map(response => response.map(item => ({
        name: item.name,
        summary: item.summary,
        stufen: item.stufen,
        description: item.description,
        imageUrl: item.imageUrl,
        eventDate: item.eventDate,
        eventStartTime: item.eventStartTime,
        eventEndTime: item.eventEndTime,
        registrationFrom: item.registrationFrom,
        registrationTo: item.registrationTo
      }))
    ));
  }
}
