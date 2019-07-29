import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StartDashboardComponent } from "./components/start-dashboard/start-dashboard.component";
import { DownloadsComponent } from "./components/downloads/downloads.component";
import { CalendarDashboardComponent } from "./components/calendar-dashboard/calendar-dashboard.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
