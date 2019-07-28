import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StartDashboardComponent } from "./components/start-dashboard/start-dashboard.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: StartDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
