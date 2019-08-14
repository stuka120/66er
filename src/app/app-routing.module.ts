import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {StartDashboardComponent} from "./components/start-dashboard/start-dashboard.component";
import {DownloadsComponent} from "./components/downloads/downloads.component";
import {CalendarDashboardComponent} from "./components/calendar-dashboard/calendar-dashboard.component";
import {StufenOverviewDashboardComponent} from "./components/stufen-overview-dashboard/stufen-overview-dashboard.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: StartDashboardComponent
  },
  {
    path: "downloads",
    pathMatch: "full",
    component: DownloadsComponent
  },
  {
    path: "kalender",
    pathMatch: "full",
    component: CalendarDashboardComponent
  },
  {
    path: "stufe/:name",
    pathMatch: "full",
    component: StufenOverviewDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "enabled",
    anchorScrolling: "enabled",
    onSameUrlNavigation: "reload"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
