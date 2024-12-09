import axios from "axios";

export default async function editAddress(editId: string, newAddressData: any) {
  const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}address/${editId}`, newAddressData, {
    withCredentials: true,
  });
  return response;
};