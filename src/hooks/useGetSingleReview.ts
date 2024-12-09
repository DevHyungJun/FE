import getSingleReview from "@/api/getSingleReview";
import { useQuery } from "@tanstack/react-query";

export default function useGetSingleReview(reviewId: string) {
  return useQuery({
    queryKey: ["getSingleReview", reviewId],
    queryFn: () => getSingleReview(reviewId),
  });
}
