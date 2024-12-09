import unlike from "@/api/unlike";
import { useMutation } from "@tanstack/react-query";

export default function useUnlike() {
  return useMutation({
    mutationFn: (id: string) => unlike(id),
  });
}
