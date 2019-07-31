import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StartDashboardStoreModule } from "./start-dashboard-store/start-dashboard-store.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StartDashboardStoreModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ]
})
export class RootStoreModule {}
