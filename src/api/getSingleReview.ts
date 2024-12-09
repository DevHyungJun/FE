import axios from "axios";

export default async function getSingleReview(reviewId: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}comments/${reviewId}`
  );
  return response.data;
}
