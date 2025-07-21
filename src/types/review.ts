export interface SingleReview {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
    profileImage: string;
  };
  order: string;
  article: string;
  title: string;
  content: string;
  rate: number;
  images: string[];
  likes: any[];
  createdAt: string;
  updatedAt: string;
}
