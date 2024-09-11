import axios from "axios";

export default async function sendMail(email: string) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}users/email-check`, { email });
  return response.data;
};