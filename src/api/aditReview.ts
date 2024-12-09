import axios from "axios";

interface AddReviewData {
  title: string;
  content: string;
  rate: number;
  images: File[];
}

export default async function aditReview(
  reviewData: AddReviewData,
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
