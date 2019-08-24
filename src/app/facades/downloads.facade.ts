import { Injectable } from "@angular/core";
import { WordpressService } from "../services/wordpress.service";
import { Observable } from "rxjs";
import {
  DownloadModel,
  WordpressMediaResponseDto
} from "../model/wordpress-media-response.dto";
import { filter, map } from "rxjs/operators";
import { RemoveHtmlPipe } from "../pipes/remove-html.pipe";

@Injectable({
  providedIn: "root"
})
export class DownloadsFacade {
  constructor(
    private wordpressService: WordpressService,
    private removeHtmlPipe: RemoveHtmlPipe
  ) {}

  getDownloadsByTagName(tagName: string): Observable<DownloadModel[]> {
    return this.wordpressService.getMedia$(tagName).pipe(
      filter(dtos => !!dtos && dtos.length > 0),
      map(dtos => dtos.map(dto => this.mapToDownloadModel(dto)))
    );
  }

  currentDownloads$: Observable<DownloadModel[]> = this.getDownloadsByTagName(
    "downloads_aktuell"
  );

  private mapToDownloadModel(dto: WordpressMediaResponseDto): DownloadModel {
    return {
      id: dto.id,
      isVisible: true,
      fileName: this.removeHtmlPipe.transform(dto.title.rendered),
      title: this.removeHtmlPipe.transform(dto.caption.rendered),
      mime_type: dto.mime_type,
      source_url: dto.source_url
    };
  }
}
