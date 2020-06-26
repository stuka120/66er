import { NgModule } from "@angular/core";
import { EventRegistrationOverlayComponent } from "./event-registration/event-registration.overlay";

@NgModule({
  declarations: [EventRegistrationOverlayComponent],
  providers: [],
  exports: [EventRegistrationOverlayComponent]
})
export class OverlayModule {}
