import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./reducer";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule, StoreModule.forFeature("config", reducer)]
})
export class ConfigStoreModule {}
