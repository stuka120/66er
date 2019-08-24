import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StartDashboardComponent } from "./components/start-dashboard/start-dashboard.component";
import { DownloadsDashboardComponent } from "./components/downloads-dashboard/downloads-dashboard.component";
import { CalendarDashboardComponent } from "./components/calendar-dashboard/calendar-dashboard.component";
import { StufenOverviewDashboardComponent } from "./components/stufen-overview-dashboard/stufen-overview-dashboard.component";
import { WiwoeDashboardFacade } from "./facades/stufen-facades/wiwoe-dashboard.facade";

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
        path: "wiwoe",
        component: StufenOverviewDashboardComponent,
        data: {requiredService: WiwoeDashboardFacade}
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
