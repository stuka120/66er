import { Post } from "../../model/post.model";

export interface State {
  needPosts: boolean;
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: State = {
  needPosts: true,
  posts: [],
  isLoading: false,
  error: null
};
