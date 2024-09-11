import axios from "axios";

export default async function usernameCheck(username: string) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}users/username-check`, { username });
  return response.data;
};