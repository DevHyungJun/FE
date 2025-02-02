import postPayment from "@/api/postPayment";
import { useMutation } from "@tanstack/react-query";

export default function usePostPayment() {
  return useMutation({
    mutationFn: postPayment,
  });
}
