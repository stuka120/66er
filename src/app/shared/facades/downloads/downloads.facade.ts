import { Injectable } from "@angular/core";
import { WordpressService } from "../../services/wordpress/wordpress.service";
import { Observable } from "rxjs";
import {
  DownloadModel,
  WordpressMediaResponseModel
} from "../../model/responses/wordpress/wordpress-media-response.model";
import { filter, map } from "rxjs/operators";
import { WordpressDownloadTagEnum } from "../../dictionary/wordpress-download-tag.enum";
import { removeHtmlTags } from "../../utils/html-string/remove-html-tags.util";
import { collectionIsNotEmpty } from "../../utils/rxjs/predicate/filter-collection-is-not-empty.util";

@Injectable({
  providedIn: "root"
})
export class DownloadsFacade {
  constructor(private wordpressService: WordpressService) {}

  getDownloadsByTagName(tagName: WordpressDownloadTagEnum): Observable<DownloadModel[]> {
    const mapToDownloadModelCollection = (wordpressMediaResponseDtoCollection: WordpressMediaResponseModel[]) => {
      return wordpressMediaResponseDtoCollection.map(this.mapToDownloadModel);
    };

    return this.wordpressService
      .getMediaCollectionForTag$(tagName)
      .pipe(filter(collectionIsNotEmpty), map(mapToDownloadModelCollection));
  }

  currentDownloads$: Observable<DownloadModel[]> = this.getDownloadsByTagName(WordpressDownloadTagEnum.Aktuelles);

  private mapToDownloadModel(dto: WordpressMediaResponseModel): DownloadModel {
    return {
      id: dto.id,
      isVisible: true,
      fileName: removeHtmlTags(dto.title.rendered),
      title: removeHtmlTags(dto.caption.rendered),
      mime_type: dto.mime_type,
      source_url: dto.source_url
    };
  }
}
