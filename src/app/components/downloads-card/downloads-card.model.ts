import { DownloadModel } from "../../model/wordpress-media-response.dto";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

export interface DownloadsCardModel {
  icon?: IconDefinition;
  title: string;
  downloads: DownloadModel[];
}
