import axios from "axios";

export default async function getJson() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}file`, {
    withCredentials: true,
  });
  return response.data;
}
