import axios from "axios";

export default async function removeReview(id: string) {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}comments/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
