import { Post } from "../../model/post.model";

export interface State {
  posts: Post[];
  needPosts: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialState: State = {
  posts: [],
  isLoading: false,
  error: null,
  needPosts: true
};
