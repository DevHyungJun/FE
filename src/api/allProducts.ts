import axios from "axios";

export default async function allProducts(page = 1, category = "", limit = 10) {
  const USER_ID = "681ca8bc0831b895114e5fed";
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}articles?limit=${limit}&page=${page}&category=${category}&user_id=${USER_ID}`
  );
  return response.data;
}
