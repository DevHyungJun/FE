export interface ReviewData {
  _id: string;
  user: string;
  article: string;
  title: string;
  content: string;
  rate: number;
  images: string[];
  likes: number;
  likedBy: string[];
  updatedAt: string;
}
