import { PostData } from "./Product";

export interface FavoriteResponse {
  data: {
    articles: PostData[];
    totalDocuments: number;
  };
}
