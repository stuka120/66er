import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MyFacebookService } from "./shared/services/my-facebook.service";
import { HttpClientModule } from "@angular/common/http";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { WordpressService } from "./shared/services/wordpress.service";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RootStoreModule } from "./root-store";
import { StufenDescriptionFacade } from "./shared/facades/stufen-description-facade.service";
import { MyFacebookFacade } from "./shared/facades/my-facebook.facade";
import { DownloadsFacade } from "./shared/facades/downloads.facade";
import { WiwoeDashboardFacade } from "./shared/facades/stufen-facades/impl/wiwoe-dashboard.facade";
import { BiberDashboardFacade } from "./shared/facades/stufen-facades/impl/biber-dashboard.facade";
import { GuspDashboardFacade } from "./shared/facades/stufen-facades/impl/gusp-dashboard.facade";
import { CaexDashboardFacade } from "./shared/facades/stufen-facades/impl/caex-dashboard.facade";
import { RaroDashboardFacade } from "./shared/facades/stufen-facades/impl/raro-dashboard.facade";
import { CalendarFacade } from "./shared/facades/calendar-facade.service";
import { registerLocaleData } from "@angular/common";
import localeDeAt from "@angular/common/locales/de-AT";
import { BreakpointService } from "./shared/services/breakpoint.service";
import { SWIPER_CONFIG, SwiperConfigInterface } from "ngx-swiper-wrapper";
import { RoutingViewsModule } from "./components/routing-views/routing-views.module";
import { ComponentsModule } from "./components/components/components.module";
import { LoadingSpinner } from "./components/components/loading-spinner/loading-spinner.component";
import { SidebarModule } from "ng-sidebar";
import { EntriesModule } from "./components/entries/entries.module";
import { ConfigurationService } from "./shared/services/configuration.service";
import { StufenTeaserFacade } from "./shared/facades/stufen-teaser.facade";
import { StufenTeamPostFacade } from "./shared/facades/stufen-team-post.facade";
import { StufenHeimstundenTimeFacade } from "./shared/facades/stufen-heimstunden-time.facade";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";
import { EventService } from "./shared/services/event.service";
import { OverlayModule } from "./components/overlay/overlay.module";

registerLocaleData(localeDeAt, "de-AT");
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: "horizontal",
  slidesPerView: "auto",
  keyboard: true,
  mousewheel: false,
  navigation: true,
  speed: 300,
  autoplay: {
    stopOnLastSlide: false,
    disableOnInteraction: false,
    waitForTransition: true,
    delay: 3000
  }
};

export function initializeApp(configurationService: ConfigurationService) {
  return () => configurationService.loadConfigFromServer();
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModalModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    RootStoreModule,
    OverlayModule,
    ComponentsModule,
    RoutingViewsModule,
    EntriesModule,
    SidebarModule.forRoot(),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
          smartLists: true,
          smartypants: false
        }
      }
    })
  ],
  declarations: [AppComponent],
  providers: [
    MyFacebookService,
    WordpressService,
    BreakpointService,
    ConfigurationService,
    EventService,

    StufenDescriptionFacade,
    StufenTeaserFacade,
    StufenTeamPostFacade,
    StufenHeimstundenTimeFacade,
    BiberDashboardFacade,
    WiwoeDashboardFacade,
    GuspDashboardFacade,
    CaexDashboardFacade,
    RaroDashboardFacade,

    MyFacebookFacade,
    DownloadsFacade,
    CalendarFacade,

    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigurationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoadingSpinner]
})
export class AppModule {}
