export interface WordpressPageModel {
  id: number;
  content: {
    rendered: string;
  };
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  }
}
