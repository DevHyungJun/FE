import order from "@/api/order";
import { useMutation } from "@tanstack/react-query";

type OrderData = {
  product: string;
  quantity: number;
}[]

export default function useOrder() {
  return useMutation({
    mutationFn: (data: OrderData)=>order(data),
  })
};