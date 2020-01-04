import {NgModule} from "@angular/core";
import {BreakpointPipe} from "./breakpoint.pipe";
import {RemoveHtmlPipe} from "./remove-html.pipe";
import {RemoveMultipleBreaksPipe} from "./remove-multiple-breaks.pipe";
import {BreakpointService} from "../services/breakpoint.service";

@NgModule({
  declarations: [
    BreakpointPipe,
    RemoveHtmlPipe,
    RemoveMultipleBreaksPipe
  ],
  providers: [
    BreakpointService,
    RemoveHtmlPipe,
    RemoveMultipleBreaksPipe,
    BreakpointPipe,
  ],
  exports: [
    BreakpointPipe,
    RemoveHtmlPipe,
    RemoveMultipleBreaksPipe
  ]
})
export class PipeModule {

}
