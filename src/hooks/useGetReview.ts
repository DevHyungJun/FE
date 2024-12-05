import getReview from "@/api/getReview";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetReview(id:string) {
  return useQuery({
    queryKey: ['reviews', id],
    queryFn: () => getReview(id),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}