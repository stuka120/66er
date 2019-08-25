import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "removeMultipleBreaks"
})
export class RemoveMultipleBreaksPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value
      .toString()
      .replace(/\n\s*\n/g, "")
      .replace(/^\s+|\s+$/g, "");
  }
}
