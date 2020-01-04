import {NgModule} from "@angular/core";
import {AboutUsDashboardComponent} from "./about-us/about-us-dashboard.component";
import {CalendarDashboardComponent} from "./calendar/calendar-dashboard.component";
import {DatenschutzDashboardComponent} from "./datenschutz/datenschutz-dashboard.component";
import {ImprintDashboardComponent} from "./imprint/imprint-dashboard.component";
import {StartDashboardComponent} from "./start/start-dashboard.component";
import {StufenOverviewDashboardComponent} from "./stufen-overview/stufen-overview-dashboard.component";
import {DownloadsDashboardComponent} from "./downloads/downloads-dashboard.component";
import {FullCalendarModule} from "@fullcalendar/angular";
import {CommonModule} from "@angular/common";
import {ComponentsModule} from "../components/components.module";
import {PipeModule} from "../../pipes/pipe.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  imports: [
    CommonModule,
    FullCalendarModule,
    ComponentsModule,
    PipeModule,
    FontAwesomeModule
  ],
  declarations: [
    AboutUsDashboardComponent,
    CalendarDashboardComponent,
    DatenschutzDashboardComponent,
    DownloadsDashboardComponent,
    ImprintDashboardComponent,
    StartDashboardComponent,
    StufenOverviewDashboardComponent
  ],
  exports: [
    AboutUsDashboardComponent,
    CalendarDashboardComponent,
    DatenschutzDashboardComponent,
    DownloadsDashboardComponent,
    ImprintDashboardComponent,
    StartDashboardComponent,
    StufenOverviewDashboardComponent
  ]
})
export class RoutingViewsModule {}
