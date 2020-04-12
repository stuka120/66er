export interface WordpressMediaResponseModel {
  id: number;
  media_type: string;
  mime_type: string;
  source_url: string;
  title: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
}

export interface DownloadModel {
  id: number;
  mime_type: string;
  source_url: string;
  fileName: string;
  title: string;
  isVisible: boolean;
}
