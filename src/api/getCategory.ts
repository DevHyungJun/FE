import axios from "axios";

export const getCategory = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}category`, {
    withCredentials: true,
  });
  return response.data;
};