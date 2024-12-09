import axios from "axios";

export default async function unlike(id: string) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}comments/${id}/unlike`,
    null,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
