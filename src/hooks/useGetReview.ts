import getReview from "@/api/getReview";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetReview(id:string) {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: ()=> getReview(id),
  });
}