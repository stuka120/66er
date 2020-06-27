import { NgModule } from "@angular/core";
import { EventRegistrationOverlayComponent } from "./event-registration/event-registration.overlay";
import { MarkdownModule } from "ngx-markdown";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [MarkdownModule, ReactiveFormsModule, CommonModule],
  declarations: [EventRegistrationOverlayComponent],
  exports: [EventRegistrationOverlayComponent]
})
export class OverlayModule {}
