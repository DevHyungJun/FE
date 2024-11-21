import axios from "axios";

export default async function allProducts(page = 1, category: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles?limit=10&page=${page}&category=${category}`);
  return response.data;
}; 