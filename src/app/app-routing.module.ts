import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StartDashboardComponent } from "./components/routing-views/start/start-dashboard.component";
import { DownloadsDashboardComponent } from "./components/routing-views/downloads/downloads-dashboard.component";
import { StufenOverviewDashboardComponent } from "./components/routing-views/stufen-overview/stufen-overview-dashboard.component";
import { WiwoeDashboardFacade } from "./facades/stufen-facades/impl/wiwoe-dashboard.facade";
import { BiberDashboardFacade } from "./facades/stufen-facades/impl/biber-dashboard.facade";
import { GuspDashboardFacade } from "./facades/stufen-facades/impl/gusp-dashboard.facade";
import { CaexDashboardFacade } from "./facades/stufen-facades/impl/caex-dashboard.facade";
import { RaroDashboardFacade } from "./facades/stufen-facades/impl/raro-dashboard.facade";
import { ImprintDashboardComponent } from "./components/routing-views/imprint/imprint-dashboard.component";
import { DatenschutzDashboardComponent } from "./components/routing-views/datenschutz/datenschutz-dashboard.component";
import { ContactViewComponent } from "./components/routing-views/contact/contact-view.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "news",
    pathMatch: "full"
  },
  {
    path: "news",
    pathMatch: "full",
    component: StartDashboardComponent
  },
  {
    path: "downloads",
    pathMatch: "full",
    component: DownloadsDashboardComponent
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
  },
  {
    path: "impressum",
    component: ImprintDashboardComponent
  },
  {
    path: "datenschutz",
    component: DatenschutzDashboardComponent
  },
  {
    path: "kontakt",
    component: ContactViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      scrollOffset: [0, 64]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
