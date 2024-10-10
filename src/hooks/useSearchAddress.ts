import searchAddress from "@/api/searchAddress";
import { useQuery } from "@tanstack/react-query";

export default function useSearchAddress() {
  return useQuery({
    queryKey: ['searchAddress'],
    queryFn: searchAddress,
  });
};