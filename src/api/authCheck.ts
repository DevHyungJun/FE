import axios from "axios";

export default async function authCheck() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}users/auth-check`, {
    withCredentials: true,
  });
  return response.data;
};