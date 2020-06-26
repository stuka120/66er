import { WordpressPostResponseModel } from "../../shared/model/responses/wordpress/wordpress-post-response.model";

export interface State {
  needPosts: boolean;
  posts: WordpressPostResponseModel[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: State = {
  needPosts: true,
  posts: [],
  isLoading: false,
  error: null
};
