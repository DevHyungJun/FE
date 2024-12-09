import getReview from "@/api/getReview";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetReview(id: string, orderOption: string) {
  return useQuery({
    queryKey: ["reviews", id, orderOption],
    queryFn: () => getReview(id, orderOption),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}
