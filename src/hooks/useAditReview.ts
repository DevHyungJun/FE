import aditReview from "@/api/aditReview";
import { useMutation } from "@tanstack/react-query";

export default function useAditReview(reviewId: string) {
  return useMutation({
    mutationFn: (reviewData: FormData) => aditReview(reviewData, reviewId),
  });
}
