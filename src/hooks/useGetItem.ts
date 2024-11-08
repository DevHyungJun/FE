import getItem from "@/api/getItem";
import { useQuery } from "@tanstack/react-query";

export default function useGetItem(page: number) {
  return useQuery({
    queryKey: ["products", page],
    queryFn:()=> getItem(page),
  });
};