import axios from "axios";

export default async function allProducts(page = 1, category = "", limit = 10) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}articles?limit=${limit}&page=${page}&category=${category}`
  );
  return response.data;
}
