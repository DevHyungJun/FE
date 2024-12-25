import axios from "axios";

export default async function chatBot(user_message: string) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}chat`, {
    user_message,
  });
  return response.data;
}
