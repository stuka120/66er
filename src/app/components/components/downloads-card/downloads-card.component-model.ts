import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { DownloadModel } from "../../../shared/model/responses/wordpress-media-response.model";

export interface DownloadsCardComponentModel {
  icon?: IconDefinition;
  title: string;
  downloads: DownloadModel[];
}
