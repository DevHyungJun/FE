import axios from "axios";

export default async function searchAddress() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}address`, {
    withCredentials: true,
  });
  return response.data;
};