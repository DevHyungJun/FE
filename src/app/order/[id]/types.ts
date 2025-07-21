export interface SelectedAddress {
  receiver_name: string;
  receiver_phone: string;
  main_address: string;
  detail_address: string;
  zip_code: string;
  is_default: boolean;
  shipping_memo: string;
  delivery_option: string;
  self_delivery_memo: string;
  _id: string;
}

export interface OrderResponseData {
  product: string;
  quantity: number;
  articleId: string;
  _id: string;
}

export interface ProductList {
  product: string;
  price: number;
}
