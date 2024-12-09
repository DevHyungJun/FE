import axios from "axios";

export default async function postLike(id: string) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}comments/${id}/like`,
    null,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
