import { likeList } from "@/api/likeList";
import { useQuery } from "@tanstack/react-query";

export default function useLikeList() {
  return useQuery({
    queryKey: ["likeList"],
    queryFn: likeList,
    retry: false,
  });
}
