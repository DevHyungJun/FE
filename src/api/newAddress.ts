import axios from 'axios';

type AddressData = {
  main_address: string;
  detail_address: string;
  is_default: boolean;
  receiver_name: string;
  receiver_phone: string;
  zipcode: string;
};

export const newAddress = async (addressData: AddressData) => {
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}address`, addressData, {
    withCredentials: true,
  });
  return data;
};