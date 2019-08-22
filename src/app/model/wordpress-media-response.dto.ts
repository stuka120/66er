export interface WordpressMediaResponseDto {
  id: number;
  media_type: string;
  mime_type: string;
  source_url: string;
  title: {
    rendered: string;
  };
}

export interface DownloadModel {
  id: number;
  mime_type: string;
  source_url: string;
  title: string;
  isVisible: boolean;
}
