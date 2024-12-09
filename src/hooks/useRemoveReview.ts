import removeReview from "@/api/removeReview";
import { useMutation } from "@tanstack/react-query";

export default function useRemoveReview() {
  return useMutation({
    mutationFn:(id:string)=> removeReview(id),
  });
};