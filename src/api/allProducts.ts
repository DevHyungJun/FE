import axios from "axios";

export default async function allProducts(page = 1) {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}articles?limit=10&page=${page}`);
  return response.data;
}; 