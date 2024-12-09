import aditReview from "@/api/aditReview";
import { useMutation } from "@tanstack/react-query";

interface AddReviewData {
  title: string;
  content: string;
  rate: number;
  images: File[];
}

export default function useAditReview(reviewId: string) {
  return useMutation({
    mutationFn: (reviewData: AddReviewData) => aditReview(reviewData, reviewId),
  });
}
