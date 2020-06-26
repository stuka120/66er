export interface PostResponseModel {
  id: string;
  message: string;
  created_time: Date;
  full_picture: string | null;
  picture: string | null;
  attachments: {
    data: {
      title: string;
      subattachments: {
        data: {
          media: {
            image: {
              height: number;
              src: string;
              width: number;
            };
          };
        }[];
      };
    }[];
  };
  comments?: {
    data?: {
      id: string;
      message: string;
      like_count: number;
      created_time: Date;
    }[];
  };
  shares: {
    count: number;
  };
}

export interface PostCollectionResponseModel {
  data: PostResponseModel[];
}
