import axios from "axios";

export default async function getItem(page = 1) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}products?limit=10&page=${page}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
