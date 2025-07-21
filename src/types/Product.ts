export type Product = {
  _id: string;
  product_name: string;
  user: string;
  price: number;
  stock_quantity: number;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type PostData = {
  _id: string;
  title: string;
  detail_images: string[];
  user: string;
  product: Product;
  createdAt: string;
  updatedAt: string;
  __v: number;
  like_count: number;
  like_user_list: string[];
  comment_list: string[];
};