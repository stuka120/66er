import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PostsStoreModule} from "./posts-store/posts-store.module";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StufenInfoStoreModule} from './stufen-info-store/stufen-info-store.module';
import {CalendarStoreModule} from "./calendar-store";

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
    CalendarStoreModule
  ]
})
export class RootStoreModule {
}
