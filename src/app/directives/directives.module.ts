import {NgModule} from "@angular/core";
import {IsLoadingDirective} from "./is-loading.directive";

@NgModule({
  declarations: [
    IsLoadingDirective
  ]  ,
  exports: [
    IsLoadingDirective
  ]
})
export class DirectivesModule {}
