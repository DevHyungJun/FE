import getUserReview from "@/api/getUserReview";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserReview(
  userId: string,
  orderOption: string,
  enabled = true
) {
  return useQuery({
    queryKey: ["userReview", userId, orderOption],
    queryFn: () => getUserReview(userId, orderOption),
    enabled,
  });
}
