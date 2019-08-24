import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StartDashboardComponent } from "./components/start-dashboard/start-dashboard.component";
import { DownloadsDashboardComponent } from "./components/downloads-dashboard/downloads-dashboard.component";
import { CalendarDashboardComponent } from "./components/calendar-dashboard/calendar-dashboard.component";
import { StufenOverviewDashboardComponent } from "./components/stufen-overview-dashboard/stufen-overview-dashboard.component";
import { WiwoeDashboardFacade } from "./facades/stufen-facades/wiwoe-dashboard.facade";
import { BiberDashboardFacade } from "./facades/stufen-facades/biber-dashboard.facade";
import { GuspDashboardFacade } from "./facades/stufen-facades/gusp-dashboard.facade";
import { CaexDashboardFacade } from "./facades/stufen-facades/caex-dashboard.facade";
import { RaroDashboardFacade } from './facades/stufen-facades/raro-dashboard.facade';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: StartDashboardComponent
  },
  {
    path: "downloads",
    pathMatch: "full",
    component: DownloadsDashboardComponent
  },
  {
    path: "kalender",
    pathMatch: "full",
    component: CalendarDashboardComponent
  },
  {
    path: "stufe",
    children: [
      {
        path: "biber",
        component: StufenOverviewDashboardComponent,
        data: { requiredService: BiberDashboardFacade }
      },
      {
        path: "wiwoe",
        component: StufenOverviewDashboardComponent,
        data: { requiredService: WiwoeDashboardFacade }
      },
      {
        path: "gusp",
        component: StufenOverviewDashboardComponent,
        data: { requiredService: GuspDashboardFacade }
      },
      {
        path: "caex",
        component: StufenOverviewDashboardComponent,
        data: { requiredService: CaexDashboardFacade }
      },
      {
        path: "raro",
        component: StufenOverviewDashboardComponent,
        data: { requiredService: RaroDashboardFacade }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
