import { getCart } from "@/api/getCart";
import { useQuery } from "@tanstack/react-query";

export default function useGetCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};