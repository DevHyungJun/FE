import axios from "axios";

export default async function aditReview(
  reviewData: FormData,
  reviewId: string
) {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}comments/${reviewId}`,
    reviewData,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
