import { NgModule } from "@angular/core";
import { EventRegistrationOverlayComponent } from "./event-registration/event-registration.overlay";
import { MarkdownModule } from "ngx-markdown";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
// tslint:disable-next-line:max-line-length
import { EventRegistrationConfirmationOverlayComponent } from "./event-registration-confirmation/event-registration-confirmation.overlay";

@NgModule({
  imports: [MarkdownModule, ReactiveFormsModule, CommonModule],
  declarations: [EventRegistrationOverlayComponent, EventRegistrationConfirmationOverlayComponent],
  exports: [EventRegistrationOverlayComponent, EventRegistrationConfirmationOverlayComponent]
})
export class OverlayModule {}
