import { getCart } from "@/api/getCart";
import { useQuery } from "@tanstack/react-query";

export default function useGetCart(enabled = true) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled,
    retry: false,
  });
}
