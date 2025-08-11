import postReview from "@/api/postReview";
import { useMutation } from "@tanstack/react-query";

export default function usePostReview(id: string) {
  return useMutation({
    mutationFn: (formData: FormData) => postReview(id, formData),
  });
}
