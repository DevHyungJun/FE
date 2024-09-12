import authCheck from "@/api/authCheck";
import { useQuery } from "@tanstack/react-query";

export default function useAuthCheck() {
  return useQuery({
    queryKey: ["authCheck"],
    queryFn: authCheck,
    staleTime: 3600000, // 1 hour in milliseconds
    gcTime: 3600000, // 1 hour in milliseconds
  });
}