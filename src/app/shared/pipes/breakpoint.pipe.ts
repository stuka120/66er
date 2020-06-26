import { ChangeDetectorRef, Pipe, PipeTransform } from "@angular/core";
import { BreakpointService } from "../services/breakpoint/breakpoint.service";
import { AsyncPipe } from "@angular/common";

@Pipe({
  name: "breakpoint"
})
export class BreakpointPipe implements PipeTransform {
  private asyncPipe: AsyncPipe;

  constructor(private breakpointService: BreakpointService, private cdr: ChangeDetectorRef) {
    this.asyncPipe = new AsyncPipe(cdr);
  }

  transform(value: BreakpointMatches): boolean {
    return this.asyncPipe.transform(this.breakpointService.isBreakpointMatched(value));
  }
}

export type BreakpointMatches = "sm-up" | "md-up" | "lg-up" | "xl-up" | "sm-down" | "md-down" | "lg-down" | "xl-down";
