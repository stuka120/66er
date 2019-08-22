import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "removeHtml"
})
export class RemoveHtmlPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value.toString().replace(/<[^>]+>/gm, "");
  }
}
