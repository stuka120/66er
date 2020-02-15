import { NgModule } from "@angular/core";
import { DatenschutzDashboardComponent } from "./datenschutz/datenschutz-dashboard.component";
import { ImprintDashboardComponent } from "./imprint/imprint-dashboard.component";
import { StartDashboardComponent } from "./start/start-dashboard.component";
import { StufenOverviewDashboardComponent } from "./stufen-overview/stufen-overview-dashboard.component";
import { DownloadsDashboardComponent } from "./downloads/downloads-dashboard.component";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../components/components.module";
import { PipeModule } from "../../pipes/pipe.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ContactViewComponent } from "./contact/contact-view.component";
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    PipeModule,
    FontAwesomeModule,
    DirectivesModule
  ],
  declarations: [
    ContactViewComponent,
    DatenschutzDashboardComponent,
    DownloadsDashboardComponent,
    ImprintDashboardComponent,
    StartDashboardComponent,
    StufenOverviewDashboardComponent
  ],
  exports: [
    ContactViewComponent,
    DatenschutzDashboardComponent,
    DownloadsDashboardComponent,
    ImprintDashboardComponent,
    StartDashboardComponent,
    StufenOverviewDashboardComponent
  ]
})
export class RoutingViewsModule {}
