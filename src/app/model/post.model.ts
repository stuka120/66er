export interface Post {
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
  comments: {
    data: {
      message: string;
      like_count: number;
    }[];
  };
}

export interface PostResponse {
  data: Post[];
}
