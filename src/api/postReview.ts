import axios from "axios";

export default async function postReview(id: string, data: FormData) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}comments/${id}`,
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
