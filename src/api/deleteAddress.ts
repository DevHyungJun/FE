import axios from "axios";

export default async function deleteAddress(addressId: string) {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}address/${addressId}`, {
    withCredentials: true,
  });
  return response.data;
};