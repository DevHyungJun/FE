import axios from "axios";

export const getCart = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}cart`, {
    withCredentials: true,
  });
  return response.data.data;
};