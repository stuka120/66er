import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar/sidebar.components";
import { ComponentsModule } from "../components/components.module";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DirectivesModule } from "../../shared/directives/directives.module";

@NgModule({
  imports: [ComponentsModule, DirectivesModule, CommonModule, FontAwesomeModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class EntriesModule {}
