import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MyFacebookService } from "./services/my-facebook.service";
import { StartDashboardComponent } from "./components/start-dashboard/start-dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DownloadsComponent } from "./components/downloads/downloads.component";
import { WordpressService } from "./services/wordpress.service";
import { FacebookModule } from 'ngx-facebook';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { StufenCardComponent } from './components/stufen-card/stufen-card.component';

@NgModule({
  declarations: [AppComponent, StartDashboardComponent, DownloadsComponent, NewsCardComponent, StufenCardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule, FacebookModule.forRoot()],
  providers: [MyFacebookService, WordpressService],
  bootstrap: [AppComponent]
})
export class AppModule {}
