import { addCart } from "@/api/addCart";
import { useMutation } from "@tanstack/react-query";

type AddCartType = {
  article: string;
  quantity: number;
}

export default function useAddCart() {
  return useMutation({
    mutationFn:(data: AddCartType)=> addCart(data),
  });
};