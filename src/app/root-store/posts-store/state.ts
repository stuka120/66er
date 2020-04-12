import { PostResponseModel } from "../../model/responses/post.model";

export interface State {
  needPosts: boolean;
  posts: PostResponseModel[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: State = {
  needPosts: true,
  posts: [],
  isLoading: false,
  error: null
};
