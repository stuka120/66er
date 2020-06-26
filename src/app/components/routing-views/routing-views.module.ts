import { NgModule } from "@angular/core";
import { DatenschutzDashboardComponent } from "./datenschutz/datenschutz-dashboard.component";
import { ImprintDashboardComponent } from "./imprint/imprint-dashboard.component";
import { StartDashboardComponent } from "./start/start-dashboard.component";
import { StufenOverviewDashboardComponent } from "./stufen-overview/stufen-overview-dashboard.component";
import { DownloadsDashboardComponent } from "./downloads/downloads-dashboard.component";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../components/components.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ContactViewComponent } from "./contact/contact-view.component";
import { EventRegistrationDashboardComponent } from "./event-registration/event-registration-dashboard.component";
import { PipeModule } from "../../shared/pipes/pipe.module";
import { DirectivesModule } from "../../shared/directives/directives.module";

@NgModule({
  imports: [CommonModule, ComponentsModule, PipeModule, FontAwesomeModule, DirectivesModule],
  declarations: [
    ContactViewComponent,
    DatenschutzDashboardComponent,
    DownloadsDashboardComponent,
    ImprintDashboardComponent,
    StartDashboardComponent,
    StufenOverviewDashboardComponent,
    EventRegistrationDashboardComponent
  ],
  exports: [
    ContactViewComponent,
    DatenschutzDashboardComponent,
    DownloadsDashboardComponent,
    ImprintDashboardComponent,
    StartDashboardComponent,
    StufenOverviewDashboardComponent,
    EventRegistrationDashboardComponent
  ]
})
export class RoutingViewsModule {}
