import getUserInfo from "@/api/getUserInfo";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false,
  });
}
