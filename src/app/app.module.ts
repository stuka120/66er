import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MyFacebookService } from "./services/my-facebook.service";
import { StartDashboardComponent } from "./components/start-dashboard/start-dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DownloadsComponent } from "./components/downloads/downloads.component";
import { WordpressService } from "./services/wordpress.service";
import { FacebookModule } from "ngx-facebook";
import { NewsCardComponent } from "./components/news-card/news-card.component";
import { StufenCardComponent } from "./components/stufen-card/stufen-card.component";
import { NewsCardCollectionComponent } from "./components/news-card-collection/news-card-collection.component";
import { StufenCardCollectionComponent } from "./components/stufen-card-collection/stufen-card-collection.component";
import { CalendarDashboardComponent } from "./components/calendar-dashboard/calendar-dashboard.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { FormsModule } from "@angular/forms";
import { FlatpickrModule } from "angularx-flatpickr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RootStoreModule } from "./root-store/root-store.module";
import { HeroBannerComponent } from "./components/hero-banner/hero-banner.component";
import { StufenOverviewDashboardComponent } from "./components/stufen-overview-dashboard/stufen-overview-dashboard.component";
import { StufenInfoFacade } from "./facades/stufen-info.facade";
import { MyFacebookFacade } from "./facades/my-facebook.facade";
import { StickyNoteComponent } from './components/time-card/sticky-note.component';

@NgModule({
  declarations: [
    AppComponent,
    StartDashboardComponent,
    DownloadsComponent,
    NewsCardComponent,
    StufenCardComponent,
    NewsCardCollectionComponent,
    StufenCardCollectionComponent,
    CalendarDashboardComponent,
    HeroBannerComponent,
    StufenOverviewDashboardComponent,
    StickyNoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModalModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FacebookModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RootStoreModule
  ],
  providers: [
    MyFacebookService,
    WordpressService,
    StufenInfoFacade,
    MyFacebookFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
