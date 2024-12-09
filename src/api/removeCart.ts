import axios from "axios";

export default async function removeCart(id: string) {
  const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}cart/${id}`, {
    withCredentials: true,
  });
  return data;
};