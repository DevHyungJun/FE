import { getCart } from "@/api/getCart";
import { useQuery } from "@tanstack/react-query";

export default function useGetCart(loginState: boolean) {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: loginState,
  });
}
