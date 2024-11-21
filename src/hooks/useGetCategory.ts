import { getCategory } from "@/api/getCategory";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategory() {
  return useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
  });
};