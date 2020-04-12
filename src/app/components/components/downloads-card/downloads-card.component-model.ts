import { DownloadModel } from "../../../model/responses/wordpress-media-response.model";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

export interface DownloadsCardComponentModel {
  icon?: IconDefinition;
  title: string;
  downloads: DownloadModel[];
}
