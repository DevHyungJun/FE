import getJson from "@/api/getJson";
import { useQuery } from "@tanstack/react-query";

export default function useGetJson() {
  return useQuery({
    queryKey: ["json"],
    queryFn: getJson,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    retry: false,
  });
}
