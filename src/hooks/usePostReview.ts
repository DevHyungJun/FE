import postReview from "@/api/postReview";
import { useMutation } from "@tanstack/react-query";

interface ReviewData {
  title: string;
  content: string;
  images: File[];
  rate: number;
};

export default function usePostReview(id: string) {
  return useMutation({
    mutationFn: (formData: ReviewData) => postReview(id, formData),
  })
}