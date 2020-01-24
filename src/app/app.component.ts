import { Component, OnDestroy, OnInit } from "@angular/core";
import { BreakpointService } from "./services/breakpoint.service";
import { untilDestroyed } from "ngx-take-until-destroy";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  sidebarOpened = false;

  isDektop = false;

  constructor(private breakpointPipe: BreakpointService) {}

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
