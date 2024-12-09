import removeCart from "@/api/removeCart";
import { useMutation } from "@tanstack/react-query";

export default function useRemoveCart() {
  return useMutation({
    mutationFn: (id: string)=>removeCart(id),
  });
};