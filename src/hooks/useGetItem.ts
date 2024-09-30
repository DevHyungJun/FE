import getItem from "@/api/getItem";
import { useQuery } from "@tanstack/react-query";

export default function useGetItem() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getItem,
  });
};