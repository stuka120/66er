import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MyFacebookService } from "./services/my-facebook.service";
import { StartDashboardComponent } from "./components/start-dashboard/start-dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DownloadsDashboardComponent } from "./components/downloads-dashboard/downloads-dashboard.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { WordpressService } from "./services/wordpress.service";
import { FacebookModule } from "ngx-facebook";
import { NewsCardComponent } from "./components/news-card/news-card.component";
import { StufenCardComponent } from "./components/stufen-card/stufen-card.component";
import { NewsCardCollectionComponent } from "./components/news-card-collection/news-card-collection.component";
import { StufenCardCollectionComponent } from "./components/stufen-card-collection/stufen-card-collection.component";
import { CalendarDashboardComponent } from "./components/calendar-dashboard/calendar-dashboard.component";
import { StufenSlideComponent } from './components/stufen-slide/stufen-slide.component';
import { StufenSlideSwiperComponent } from './components/stufen-slide-swiper/stufen-slide-swiper.component';
import { FormsModule } from "@angular/forms";
import { FlatpickrModule } from "angularx-flatpickr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RootStoreModule } from "./root-store";
import { HeroBannerComponent } from "./components/hero-banner/hero-banner.component";
import { StufenOverviewDashboardComponent } from "./components/stufen-overview-dashboard/stufen-overview-dashboard.component";
import { StufenInfoFacade } from "./facades/stufen-info.facade";
import { MyFacebookFacade } from "./facades/my-facebook.facade";
import { StickyNoteComponent } from "./components/sticky-note/sticky-note.component";
import { TeamCardComponent } from "./components/team-card/team-card.component";
import { TeamCardCollectionComponent } from "./components/team-card-collection/team-card-collection.component";
import { DownloadsFacade } from "./facades/downloads.facade";
import { RemoveHtmlPipe } from "./pipes/remove-html.pipe";
import { DownloadsCardComponent } from "./components/downloads-card/downloads-card.component";
import { DownloadsCardItemComponent } from "./components/downloads-card-item/downloads-card-item.component";
import { WiwoeDashboardFacade } from "./facades/stufen-facades/wiwoe-dashboard.facade";
import { BiberDashboardFacade } from "./facades/stufen-facades/biber-dashboard.facade";
import { GuspDashboardFacade } from "./facades/stufen-facades/gusp-dashboard.facade";
import { CaexDashboardFacade } from "./facades/stufen-facades/caex-dashboard.facade";
import { RaroDashboardFacade } from "./facades/stufen-facades/raro-dashboard.facade";
import { RemoveMultipleBreaksPipe } from "./pipes/remove-multiple-breaks.pipe";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { UpcomingEventsComponent } from "./components/upcoming-events/upcoming-events.component";
import { EventsFacade } from "./facades/events.facade";
import { registerLocaleData } from "@angular/common";
import localeDeAt from "@angular/common/locales/de-AT";

registerLocaleData(localeDeAt, "de-AT");
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  keyboard: true,
  mousewheel: true,
  navigation: true,
  speed: 300,
}

@NgModule({
  declarations: [
    AppComponent,
    StartDashboardComponent,
    DownloadsDashboardComponent,
    NewsCardComponent,
    StufenCardComponent,
    NewsCardCollectionComponent,
    StufenCardCollectionComponent,
    CalendarDashboardComponent,
    HeroBannerComponent,
    StufenOverviewDashboardComponent,
    StickyNoteComponent,
    TeamCardComponent,
    TeamCardCollectionComponent,
    RemoveHtmlPipe,
    DownloadsCardComponent,
    DownloadsCardItemComponent,
    RemoveMultipleBreaksPipe,
    UpcomingEventsComponent,
    StufenSlideComponent,
    StufenSlideSwiperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    FlatpickrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModalModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FacebookModule.forRoot(),
    FullCalendarModule,
    RootStoreModule,
    SwiperModule
  ],
  providers: [
    MyFacebookService,
    WordpressService,

    StufenInfoFacade,
    BiberDashboardFacade,
    WiwoeDashboardFacade,
    GuspDashboardFacade,
    CaexDashboardFacade,
    RaroDashboardFacade,

    MyFacebookFacade,
    DownloadsFacade,
    EventsFacade,

    RemoveHtmlPipe,
    RemoveMultipleBreaksPipe,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
