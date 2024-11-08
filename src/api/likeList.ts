import axios from "axios";

export const likeList = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/like-list`, {
    withCredentials: true,
  });
  return response.data;
};