import { Pipe, PipeTransform } from "@angular/core";
import { removeHtmlTags } from "../utils/html-string/remove-html-tags.util";

@Pipe({
  name: "removeHtml"
})
export class RemoveHtmlPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return removeHtmlTags(value.toString());
  }
}
