import { Component, OnDestroy, OnInit } from "@angular/core";
import { BreakpointService } from "./services/breakpoint.service";
import { untilDestroyed } from "ngx-take-until-destroy";
import { Observable } from "rxjs";
import { AlertComponentModel } from "./components/components/alert/alert.component-model";
import { ConfigFacade } from "./facades/config.facade";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  sidebarOpened = false;

  isDektop = false;

  /**
   * this is the model that contains special config flags...
   * For instance this is for enabling the special news model (corona instance f.i.)
   */
  alertModel$: Observable<AlertComponentModel | undefined>;

  constructor(
    private breakpointPipe: BreakpointService,
    private configFacade: ConfigFacade
  ) {
    this.alertModel$ = this.configFacade.getAlertModel$();
  }

  toggleSidebar() {
    if (!this.isDektop) {
      this.sidebarOpened = !this.sidebarOpened;
    }
  }

  ngOnInit(): void {
    this.breakpointPipe
      .isBreakpointMatched("md-up")
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.isDektop = value;
        if (this.isDektop) {
          this.sidebarOpened = false;
        }
      });
  }

  ngOnDestroy(): void {}
}
