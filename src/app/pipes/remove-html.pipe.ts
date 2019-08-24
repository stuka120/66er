import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "removeHtml"
})
export class RemoveHtmlPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value
      .toString()
      .replace(/<[^>]+>/gm, "")
      .replace(/\n\s*\n/g, "\n\n")
      .replace(/^\s+|\s+$/g, "");
  }
}
