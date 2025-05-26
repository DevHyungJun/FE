export interface InfiniteProductPostResponse {
  pages: ProductPostResponse[];
  pageParams: (number | string)[];
}

export interface ProductPostResponse {
  code: number;
  message: string;
  data: ProductPostPageData;
}

export interface ProductPostPageData {
  counts: number;
  next: string | null; // number | false | null → string | null 로 수정
  prev: string | null; // number | false | null → string | null 로 수정
  results: ProductPost[];
}

export interface ProductPost {
  _id: string;
  title: string;
  detail_images: string[];
  user: string;
  product: Product;
  like_user_list: string[];
  like_count: number;
  comment_list: any[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Product {
  _id: string;
  product_name: string;
  user: string;
  price: number;
  stock_quantity: number;
  thumbnail: string;
  sales_count: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
