import { Injectable } from "@angular/core";
import { WordpressService } from "../services/wordpress.service";
import { Observable } from "rxjs";
import {
  DownloadModel,
  WordpressMediaResponseDto
} from "../model/wordpress-media-response.dto";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DownloadsFacade {
  constructor(private wordpressService: WordpressService) {}

  currentDownloads$: Observable<
    DownloadModel[]
  > = this.wordpressService
    .getMedia$("downloads_aktuell")
    .pipe(map(dtos => dtos.map(dto => this.getDownloadModel(dto))));

  private getDownloadModel(dto: WordpressMediaResponseDto): DownloadModel {
    return {
      id: dto.id,
      isVisible: true,
      title: dto.title.rendered,
      mime_type: dto.mime_type,
      source_url: dto.source_url
    };
  }
}
