import { Injectable } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { distinctUntilChanged, map, shareReplay, startWith } from "rxjs/operators";
import { BreakpointMatches } from "../pipes/breakpoint.pipe";

const QUERY: Map<"xs" | "sm" | "md" | "lg" | "xl", string> = new Map([
  ["xl", "(min-width: 1200px)"],
  ["lg", "(min-width: 992px)"],
  ["md", "(min-width: 768px)"],
  ["sm", "(min-width: 576px)"],
  ["xs", "(min-width: 0px)"]
]);

@Injectable()
export class BreakpointService {
  // tslint:disable-next-line:variable-name
  private readonly _size$: Observable<"xs" | "sm" | "md" | "lg" | "xl">;

  constructor() {
    this._size$ = fromEvent(window, "resize").pipe(
      startWith(this._getScreenSize()),
      map(() => {
        return this._getScreenSize();
      }),
      distinctUntilChanged(),
      shareReplay(1)
    );
  }

  public get size$(): Observable<"xs" | "sm" | "md" | "lg" | "xl"> {
    return this._size$;
  }

  public isBreakpointMatched(breakpoint: BreakpointMatches) {
    return this._size$.pipe(
      map((size) => {
        switch (breakpoint) {
          case "sm-up":
            return size === "sm" || size === "md" || size === "lg" || size === "xl";
          case "md-up":
            return size === "md" || size === "lg" || size === "xl";
          case "lg-up":
            return size === "lg" || size === "xl";
          case "xl-up":
            return size === "xl";
          case "sm-down":
            return size === "xs" || size === "sm";
          case "md-down":
            return size === "xs" || size === "sm" || size === "md";
          case "lg-down":
            return size === "xs" || size === "sm" || size === "md" || size === "lg";
          case "xl-down":
            return size === "xs" || size === "sm" || size === "md" || size === "lg" || size === "xl";
        }
      }),
      distinctUntilChanged()
    );
  }

  private _getScreenSize(): "xs" | "sm" | "md" | "lg" | "xl" {
    const [[newSize = "xs"]] = Array.from(QUERY.entries()).filter(
      ([, mediaQuery]) => window.matchMedia(mediaQuery).matches
    );
    return newSize as "xs" | "sm" | "md" | "lg" | "xl";
  }
}
