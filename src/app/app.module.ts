import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FacebookService } from "./services/facebook.service";
import { StartDashboardComponent } from "./components/start-dashboard/start-dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DownloadsComponent } from "./components/downloads/downloads.component";
import { WordpressService } from "./services/wordpress.service";

@NgModule({
  declarations: [AppComponent, StartDashboardComponent, DownloadsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [FacebookService, WordpressService],
  bootstrap: [AppComponent]
})
export class AppModule {}
