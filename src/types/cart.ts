export interface CartItem {
  article: string;
  product: string;
  quantity: number;
  price: number;
  onSelected: boolean;
}

export interface CartResponse {
  code: number;
  message: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  user: string;
  __v: number;
  article_list: CartArticle[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  onSelected?: true;
}

export interface CartArticle {
  article: string; // 참조하는 article의 ID
  quantity: number;
  _id: string;
}
