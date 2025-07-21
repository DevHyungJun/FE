export interface OrderHistoryProduct {
  created_at: string;
  images: string[];
  price: number;
  product_name: string;
  sales_count: number;
  stock_quantity: number;
  thumbnail: string;
  updated_at: string;
  user: string;
  __v: number;
  _id: string;
}

export interface OrderHistoryItem {
  product: OrderHistoryProduct;
  quantity: number;
  _id: string;
}

export interface OrderHistoryData {
  createdAt: string;
  product_list: OrderHistoryItem[];
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
}
