import postLike from "@/api/postLike";
import { useMutation } from "@tanstack/react-query";

export default function usePostLike() {
  return useMutation({
    mutationFn: (id: string) => postLike(id),
  });
}
