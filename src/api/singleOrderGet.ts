import axios from "axios";

export default async function singleOrderGet(id: string) {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}order/${id}`,
  {
    withCredentials: true
  });
  return response.data;
};