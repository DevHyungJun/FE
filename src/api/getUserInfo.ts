import axios from "axios";

export default async function getUserInfo() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}users/info`, {
    withCredentials: true,
  });
  return response.data;
};