import axios from "axios";

export default async function productDetail(id: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/${id}`);
  return response.data;
};