export interface WordpressMediaModel {
    id: number;
    media_type: string;
    mime_type: string;
    source_url: string;
    title: {
        rendered: string;
    }
}

export interface WordpressFileModel {
    id: number;
    mime_type: string;
    source_url: string;
    title: string;
    fileGroup: string;
    isVisible: boolean;
}