import { Pipe, PipeTransform } from "@angular/core";
import { flatMultipleLineBreaks } from "../utils/html-string/flat-multiple-line-breaks.util";

@Pipe({
  name: "removeMultipleBreaks"
})
export class RemoveMultipleBreaksPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return flatMultipleLineBreaks(value.toString());
  }
}
