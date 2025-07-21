export interface AddressData {
  _id: string;
  receiver_name: string;
  receiver_phone: string;
  main_address: string;
  detail_address?: string;
  zip_code: string;
  shipping_memo?: string;
  is_default: boolean;
}
