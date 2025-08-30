export interface Address {
  _id: string;
  is_default: boolean;
  main_address: string;
  detail_address: string;
  zip_code: string;
  user: string;
  receiver_name: string;
  receiver_phone: string;
  shipping_memo: string;
  createdAt: string; // ISO 날짜 문자열
  updatedAt: string; // ISO 날짜 문자열
  __v: number;
}

export interface UserProfile {
  data: {
    email: string;
    gender: "man" | "woman"; // 성별은 enum처럼 제한 가능
    generation: number;
    username: string;
    address_list: Address[];
    default_address: string; // address의 _id 참조
    profile_image: string;
  };
}
