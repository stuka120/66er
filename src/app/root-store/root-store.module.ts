import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostsStoreModule } from "./posts-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StufenInfoStoreModule } from "./stufen-info-store";
import { CalendarStoreModule } from "./calendar-store";
import { ConfigStoreModule } from "./config-store";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostsStoreModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    StufenInfoStoreModule,
    CalendarStoreModule,
    ConfigStoreModule
  ]
})
export class RootStoreModule {}
