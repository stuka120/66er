import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MyFacebookService } from "./services/my-facebook.service";
import { HttpClientModule } from "@angular/common/http";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { WordpressService } from "./services/wordpress.service";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RootStoreModule } from "./root-store";
import { StufenInfoFacade } from "./facades/stufen-info.facade";
import { MyFacebookFacade } from "./facades/my-facebook.facade";
import { DownloadsFacade } from "./facades/downloads.facade";
import { WiwoeDashboardFacade } from "./facades/stufen-facades/wiwoe-dashboard.facade";
import { BiberDashboardFacade } from "./facades/stufen-facades/biber-dashboard.facade";
import { GuspDashboardFacade } from "./facades/stufen-facades/gusp-dashboard.facade";
import { CaexDashboardFacade } from "./facades/stufen-facades/caex-dashboard.facade";
import { RaroDashboardFacade } from "./facades/stufen-facades/raro-dashboard.facade";
import { EventsFacade } from "./facades/events.facade";
import { registerLocaleData } from "@angular/common";
import localeDeAt from "@angular/common/locales/de-AT";
import { BreakpointService } from "./services/breakpoint.service";
import { SWIPER_CONFIG, SwiperConfigInterface } from "ngx-swiper-wrapper";
import { RoutingViewsModule } from "./components/routing-views/routing-views.module";
import { ComponentsModule } from "./components/components/components.module";
import { LoadingSpinner } from "./components/components/loading-spinner/loading-spinner.component";
import { SidebarModule } from "ng-sidebar";
import { EntriesModule } from "./components/entries/entries.module";
import { ConfigurationService } from "./services/configuration.service";

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
  return () => configurationService.loadConfig();
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
    ComponentsModule,
    RoutingViewsModule,
    EntriesModule,
    SidebarModule.forRoot()
  ],
  declarations: [AppComponent],
  providers: [
    MyFacebookService,
    WordpressService,
    BreakpointService,
    ConfigurationService,

    StufenInfoFacade,
    BiberDashboardFacade,
    WiwoeDashboardFacade,
    GuspDashboardFacade,
    CaexDashboardFacade,
    RaroDashboardFacade,

    MyFacebookFacade,
    DownloadsFacade,
    EventsFacade,

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
