import { NgModule } from "@angular/core";
import { NewsCardComponent } from "./news-card/news-card.component";
import { StufenCardComponent } from "./stufen-card/stufen-card.component";
import { NewsCardCollectionComponent } from "./news-card-collection/news-card-collection.component";
import { StufenCardCollectionComponent } from "./stufen-card-collection/stufen-card-collection.component";
import { HeroBannerComponent } from "./hero-banner/hero-banner.component";
import { StickyNoteComponent } from "./sticky-note/sticky-note.component";
import { TeamCardComponent } from "./team-card/team-card.component";
import { TeamCardCollectionComponent } from "./team-card-collection/team-card-collection.component";
import { DownloadsCardComponent } from "./downloads-card/downloads-card.component";
import { DownloadsCardItemComponent } from "./downloads-card-item/downloads-card-item.component";
import { UpcomingEventCollectionComponent } from "./upcoming-event-collection/upcoming-event-collection.component";
import { UpcomingEventComponent } from "./upcoming-event/upcoming-event.component";
import { StufenSlideComponent } from "./stufen-slide/stufen-slide.component";
import { StufenSlideSwiperComponent } from "./stufen-slide-swiper/stufen-slide-swiper.component";
import { EventClickedModalComponent } from "./modal/event-clicked-modal/event-clicked-modal.component";
import { FooterComponent } from "./footer/footer.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { SwiperModule } from "ngx-swiper-wrapper";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterModule } from "@angular/router";
import { PipeModule } from "../../pipes/pipe.module";
import { IframeComponent } from "./iframe/iframe.component";
import { LoadingSpinner } from "./loading-spinner/loading-spinner.component";
import { DirectivesModule } from "../../directives/directives.module";
import { LoadingImage } from "./loading-image/loading-image.component";
import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    SwiperModule,
    NgbModule,
    FontAwesomeModule,
    PipeModule,
    DirectivesModule
  ],
  declarations: [
    NewsCardComponent,
    StufenCardComponent,
    NewsCardCollectionComponent,
    StufenCardCollectionComponent,
    HeroBannerComponent,
    StickyNoteComponent,
    TeamCardComponent,
    TeamCardCollectionComponent,
    DownloadsCardComponent,
    DownloadsCardItemComponent,
    UpcomingEventCollectionComponent,
    UpcomingEventComponent,
    StufenSlideComponent,
    StufenSlideSwiperComponent,
    EventClickedModalComponent,
    FooterComponent,
    IframeComponent,
    LoadingSpinner,
    LoadingImage,
    NavbarComponent
  ],
  exports: [
    NewsCardComponent,
    StufenCardComponent,
    NewsCardCollectionComponent,
    StufenCardCollectionComponent,
    HeroBannerComponent,
    StickyNoteComponent,
    TeamCardComponent,
    TeamCardCollectionComponent,
    DownloadsCardComponent,
    DownloadsCardItemComponent,
    UpcomingEventCollectionComponent,
    UpcomingEventComponent,
    StufenSlideComponent,
    StufenSlideSwiperComponent,
    EventClickedModalComponent,
    FooterComponent,
    IframeComponent,
    LoadingSpinner,
    LoadingImage,
    NavbarComponent
  ]
})
export class ComponentsModule {}
